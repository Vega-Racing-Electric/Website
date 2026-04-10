<?php
// VRE PERSONNEL MANAGER - High-Security API v2
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? "";

if ($action === "LIST_USERS") {
    $stmt = $conn->prepare("SELECT id, email, role, created_at FROM users");
    $stmt->execute();
    $result = $stmt->get_result();
    $users = [];
    while ($row = $result->fetch_assoc()) $users[] = $row;
    echo json_encode($users);
} 

elseif ($action === "CREATE_USER") {
    // Generate hash automatically!
    $email = $input['email'];
    $pass = $input['password'];
    $role = $input['role'] ?? 'TEAM MEMBER';
    
    $hash = password_hash($pass, PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (email, password_hash, encrypted_pass, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $hash, $pass, $role);
    
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => "EMAIL ALREADY EXISTS"]);
}

elseif ($action === "UPDATE_ROLE") {
    $stmt = $conn->prepare("UPDATE users SET role = ? WHERE id = ?");
    $stmt->bind_param("si", $input['new_role'], $input['user_id']);
    if ($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error"]);
}

elseif ($action === "REVEAL_PASS") {
    $adminEmail = $input['admin_email'];
    $adminPass = $input['admin_pass'];
    $targetId = $input['target_id'];

    $check = $conn->prepare("SELECT password_hash, role FROM users WHERE email = ?");
    $check->bind_param("s", $adminEmail);
    $check->execute();
    $adminRes = $check->get_result()->fetch_assoc();

    if (password_verify($adminPass, $adminRes['password_hash']) && in_array($adminRes['role'], ['WEB DEV', 'CLUB HEAD'])) {
        $stmt = $conn->prepare("SELECT encrypted_pass FROM users WHERE id = ?");
        $stmt->bind_param("i", $targetId);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_assoc();
        echo json_encode(["status" => "success", "password" => $res['encrypted_pass'] ?? "N/A"]);
    } else {
        echo json_encode(["status" => "error", "message" => "ADMIN AUTH FAILED"]);
    }
}

$conn->close();
?>
