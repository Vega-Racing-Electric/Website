<?php
// VRE DEPOT MANAGER - INVENTORY & LOGISTICS
header('Content-Type: application/json');
require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $_POST['action'] ?? $input['action'] ?? "";

// HELPERS
function getNextAssetId($conn, $category) {
    $series_map = [
        'Mechanical Tools' => '101',
        'Mechanical Consumables' => '102',
        'Electrical Tools' => '201',
        'Electrical Consumables' => '202',
        'Accumulator' => '301',
        'Charging Cart' => '302',
        'Car Parts' => '303'
    ];
    
    $prefix = $series_map[$category] ?? '999';
    $pattern = $prefix . '%';
    
    $stmt = $conn->prepare("SELECT MAX(CAST(asset_id AS UNSIGNED)) as max_id FROM inventory WHERE asset_id LIKE ?");
    $stmt->bind_param("s", $pattern);
    $res_obj = $stmt->get_result();
    $res = $res_obj ? $res_obj->fetch_assoc() : null;
    
    if (!$res || !$res['max_id']) {
        return $prefix . '0000001';
    }
    
    return strval(intval($res['max_id']) + 1);
}

// 1. LIST INVENTORY
if ($action === "LIST_INVENTORY") {
    $res = $conn->query("SELECT * FROM inventory ORDER BY asset_id ASC");
    $items = [];
    while($row = $res->fetch_assoc()) $items[] = $row;
    echo json_encode($items);
}

// 2. LIST PENDING SUBMISSIONS (Admin Only)
elseif ($action === "LIST_SUBMISSIONS") {
    $res = $conn->query("SELECT * FROM inventory_submissions WHERE status = 'PENDING' ORDER BY created_at DESC");
    $subs = [];
    while($row = $res->fetch_assoc()) $subs[] = $row;
    echo json_encode($subs);
}

// 3. SUBMIT NEW ASSET (Members) - "DEPOT REQUEST"
elseif ($action === "SUBMIT_ITEM") {
    $stmt = $conn->prepare("INSERT INTO inventory_submissions (name, count, owner, description, location, category, submitted_by) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $input['name'], $input['count'], $input['owner'], $input['description'], $input['location'], $input['category'], $input['submitted_by']);
    if ($stmt->execute()) {
        $log_msg = "LOGGED NEW MUNITION: " . $input['name'] . " (PENDING APPROVAL)";
        $user_email = $input['submitted_by'] ?? "SYSTEM";
        $log_stmt = $conn->prepare("INSERT INTO logs (action, user_email) VALUES (?, ?)");
        $log_stmt->bind_param("ss", $log_msg, $user_email);
        $log_stmt->execute();
        echo json_encode(["status" => "success"]);
    } else echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 4. APPROVE SUBMISSION (Admin)
elseif ($action === "APPROVE_SUBMISSION") {
    $id = intval($input['submission_id']);
    
    // Get the submission data
    $stmt = $conn->prepare("SELECT * FROM inventory_submissions WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res_obj = $stmt->get_result();
    $sub = $res_obj ? $res_obj->fetch_assoc() : null;
    
    if (!$sub) {
        echo json_encode(["status" => "error", "message" => "Submission not found"]);
        exit;
    }
    
    // Generate Asset ID
    $asset_id = getNextAssetId($conn, $sub['category']);
    
    $conn->begin_transaction();
    try {
        // Insert into inventory
        $ins = $conn->prepare("INSERT INTO inventory (asset_id, name, count, owner, description, location, category, added_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $ins->bind_param("ssssssss", $asset_id, $sub['name'], $sub['count'], $sub['owner'], $sub['description'], $sub['location'], $sub['category'], $sub['submitted_by']);
        $ins->execute();
        
        // Update submission status
        $upd = $conn->prepare("UPDATE inventory_submissions SET status = 'APPROVED' WHERE id = ?");
        $upd->bind_param("i", $id);
        $upd->execute();

        // LOG ACTION
        $log_msg = "APPROVED ASSET: " . $sub['name'] . " (ID: $asset_id)";
        $user_email = $input['admin_email'] ?? "SYSTEM";
        $log_stmt = $conn->prepare("INSERT INTO logs (action, user_email) VALUES (?, ?)");
        $log_stmt->bind_param("ss", $log_msg, $user_email);
        $log_stmt->execute();
        
        $conn->commit();
        echo json_encode(["status" => "success", "asset_id" => $asset_id]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

// 5. REJECT SUBMISSION
elseif ($action === "REJECT_SUBMISSION") {
    $id = intval($input['submission_id']);
    
    // Get the submission data for logging
    $stmt = $conn->prepare("SELECT name FROM inventory_submissions WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $sub = $stmt->get_result()->fetch_assoc();

    $stmt = $conn->prepare("UPDATE inventory_submissions SET status = 'REJECTED' WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $log_msg = "REJECTED ASSET: " . ($sub['name'] ?? "ID $id");
        $user_email = $input['admin_email'] ?? "SYSTEM";
        $log_stmt = $conn->prepare("INSERT INTO logs (action, user_email) VALUES (?, ?)");
        $log_stmt->bind_param("ss", $log_msg, $user_email);
        $log_stmt->execute();
        echo json_encode(["status" => "success"]);
    } else echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 6. DELETE INVENTORY ITEM
elseif ($action === "DELETE_ITEM") {
    $id = intval($input['id']);
    $stmt = $conn->prepare("SELECT name, asset_id FROM inventory WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $item = $stmt->get_result()->fetch_assoc();

    $stmt = $conn->prepare("DELETE FROM inventory WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $log_msg = "DELETED ASSET: " . ($item['name'] ?? "UNKNOWN") . " (" . ($item['asset_id'] ?? "ID $id") . ")";
        $user_email = $input['admin_email'] ?? "SYSTEM";
        $log_stmt = $conn->prepare("INSERT INTO logs (action, user_email) VALUES (?, ?)");
        $log_stmt->bind_param("ss", $log_msg, $user_email);
        $log_stmt->execute();
        echo json_encode(["status" => "success"]);
    } else echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 7. UPDATE INVENTORY ITEM
elseif ($action === "UPDATE_ITEM") {
    $id = intval($input['id']);
    $stmt = $conn->prepare("UPDATE inventory SET name=?, count=?, owner=?, description=?, location=?, category=? WHERE id=?");
    $stmt->bind_param("ssssssi", $input['name'], $input['count'], $input['owner'], $input['description'], $input['location'], $input['category'], $id);
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
