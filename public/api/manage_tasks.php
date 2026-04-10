<?php
// VRE MISSION CONTROL - TASK MANAGEMENT
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? "";

// 1. LIST ALL TASKS (Filterable by Role/User)
if ($action === "LIST_TASKS") {
    $sql = "SELECT t.*, 
                   m1.name as member_name, 
                   m1.email as member_email,
                   m2.name as assigner_name
            FROM tasks t 
            JOIN members m1 ON t.assignee_id = m1.id 
            LEFT JOIN members m2 ON t.assigner_id = m2.id 
            ORDER BY t.created_at DESC";
    
    $result = $conn->query($sql);
    $tasks = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) $tasks[] = $row;
    }
    echo json_encode($tasks);
}

// 2. ASSIGN NEW MISSION
elseif ($action === "CREATE_TASK") {
    $stmt = $conn->prepare("INSERT INTO tasks (assignee_id, assigner_id, title, description) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiss", $input['member_id'], $input['admin_id'], $input['title'], $input['description']);
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 3. UPDATE STATUS (Member Side)
elseif ($action === "UPDATE_STATUS") {
    $stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $input['status'], $input['task_id']);
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 4. PURGE TASKS (Admin Side)
elseif ($action === "PURGE_TASKS") {
    $res = $conn->query("TRUNCATE TABLE tasks");
    if ($res) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
