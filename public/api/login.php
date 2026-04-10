<?php
// VRE SECURE LOGIN v3 - JWT-STYLE TOKEN SYSTEM
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

require_once 'config.php';

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email']) || !isset($input['password'])) {
    echo json_encode(["status" => "error", "message" => "MISSING DATA"]);
    exit;
}

$email = strtolower(trim($input['email']));
$pass = trim($input['password']);
$is_init = isset($input['action']) && $input['action'] === 'INIT';

if ($is_init) {
    // Check if account exists and if password is empty
    $check = $conn->prepare("SELECT id, password FROM members WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $c_res = $check->get_result();
    
    if ($row = $c_res->fetch_assoc()) {
        if (!empty($row['password'])) {
            echo json_encode(["status" => "error", "message" => "ACCOUNT ALREADY INITIALIZED"]);
            exit;
        } else {
            // Apply new password
            $upd = $conn->prepare("UPDATE members SET password = ? WHERE email = ?");
            $upd->bind_param("ss", $pass, $email);
            $upd->execute();
        }
    } else {
        echo json_encode(["status" => "error", "message" => "EMAIL NOT FOUND IN REGISTRY"]);
        exit;
    }
}

// FETCH MEMBER
$sql = "SELECT id, email, role, website_role, name, password FROM members WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    // Fallback if website_role hasn't been added yet
    $stmt = $conn->prepare("SELECT id, email, role, name, password FROM members WHERE email = ? AND password = ?");
}

if ($stmt) {
    $stmt->bind_param("ss", $email, $pass);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    echo json_encode(["status" => "error", "message" => "DATABASE SCHEMA MISMATCH. PLEASE RUN FORCE_IMPORT."]);
    exit;
}

if ($result && $row = $result->fetch_assoc()) {
    // Determine user role (prefer website_role for permissions)
    $user_role = !empty($row['website_role']) ? $row['website_role'] : $row['role'];

    // GENERATE A FUTURE-PROOF SIGNED TOKEN
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        "id" => $row['id'],
        "email" => $row['email'],
        "role" => strtoupper(trim($user_role)),
        "name" => $row['name'],
        "exp" => time() + (86400 * 7)
    ]));
    
    $secret = $jwt_secret ?? "VRE_DEFAULT_FALLBACK"; // Secret from config.php
    $signature = hash_hmac('sha256', "$header.$payload", $secret);
    $token = "$header.$payload." . base64_encode($signature);

    echo json_encode([
        "status" => "success", 
        "token" => $token, 
        "user" => [
            "email" => $row['email'],
            "role" => strtoupper(trim($user_role)),
            "name" => $row['name']
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "INVALID PILOT CREDENTIALS"]);
}

$conn->close();
?>
