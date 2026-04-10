<?php
// VRE ROSTER MANAGER v4 - ADVANCED DEBUGGING
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $_POST['action'] ?? $input['action'] ?? "";

if ($action === "LIST_ROSTER") {
    $stmt = $conn->prepare("SELECT * FROM members ORDER BY subsystem ASC, name ASC");
    $stmt->execute();
    $result = $stmt->get_result();
    $members = [];
    while ($row = $result->fetch_assoc()) $members[] = $row;
    echo json_encode($members);
}

elseif ($action === "IMPORT_CSV") {
    if (!isset($_FILES['csv_file'])) {
        echo json_encode(["status" => "error", "message" => "NO FILE RECEIVED"]);
        exit;
    }

    $file = $_FILES['csv_file']['tmp_name'];
    $handle = fopen($file, "r");
    fgetcsv($handle); // Skip Header
    
    $imported = 0;
    $errors = [];

    while (($row = fgetcsv($handle)) !== FALSE) {
        if (empty($row[0])) continue;

        // VRE Structure: Name(0), Domain(1), Years(2), Role(3), Spacer(4), LinkedIn(5), GitHub(6), Instagram(7), Image(8)
        $name       = mysqli_real_escape_string($conn, trim($row[0]));
        $subsystem  = mysqli_real_escape_string($conn, trim($row[1]));
        $years      = mysqli_real_escape_string($conn, trim($row[2], ' "'));
        $role       = mysqli_real_escape_string($conn, trim($row[3], ' "'));
        $linkedin   = mysqli_real_escape_string($conn, trim($row[5] ?? ""));
        $github     = mysqli_real_escape_string($conn, trim($row[6] ?? ""));
        $instagram  = mysqli_real_escape_string($conn, trim($row[7] ?? ""));
        $image      = mysqli_real_escape_string($conn, basename(trim($row[8] ?? "placeholder.png")));

        $sql = "INSERT INTO members (name, subsystem, years, role, linkedin, github, instagram, image) VALUES ('$name', '$subsystem', '$years', '$role', '$linkedin', '$github', '$instagram', '$image')";
        
        $res = $conn->query($sql);
        if (!$res) {
            $errors[] = "LINE " . ($imported + 2) . ": " . $conn->error;
        } else {
            $imported++;
        }
    }
    
    fclose($handle);
    if (count($errors) > 0) {
        echo json_encode(["status" => "error", "message" => "IMPORT COMPLETED WITH ERRORS", "errors" => array_slice($errors, 0, 5)]);
    } else {
        echo json_encode(["status" => "success", "message" => "$imported MEMBERS SYNCED!"]);
    }
}

elseif ($action === "ADD_MEMBER") {
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;
    $years = $input['years'] ?? date("Y");
    $image = $input['image'] ?? "placeholder.png";
    $website_role = $input['website_role'] ?? "Team Member";

    $stmt = $conn->prepare("INSERT INTO members (name, subsystem, years, role, website_role, linkedin, github, instagram, image, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $input['name'], $input['subsystem'], $years, $input['role'], $website_role, $input['linkedin'], $input['github'], $input['instagram'], $image, $email, $password);
    
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

elseif ($action === "UPDATE_MEMBER") {
    $id = intval($input['id']);
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;
    $image = $input['image'] ?? "placeholder.png";
    $website_role = $input['website_role'] ?? "Team Member";
    $stmt = $conn->prepare("UPDATE members SET name=?, subsystem=?, years=?, role=?, website_role=?, linkedin=?, github=?, instagram=?, email=?, password=?, image=? WHERE id=?");
    $stmt->bind_param("sssssssssssi", $input['name'], $input['subsystem'], $input['years'], $input['role'], $website_role, $input['linkedin'], $input['github'], $input['instagram'], $email, $password, $image, $id);
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

elseif ($action === "WIPE_ROSTER") {
    if ($conn->query("TRUNCATE TABLE members")) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
