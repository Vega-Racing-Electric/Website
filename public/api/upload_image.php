<?php
// VRE SECURE UPLOADER - Saves images to /team_assets/ with auto-renaming
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// 1. AUTH CHECK - ONLY HIGH ROLES CAN UPLOAD
// In a real system, we would check a session token here.
$input = $_POST; // We'll send name and user_email via POST

if (!isset($_FILES['image']) || !isset($input['member_name'])) {
    echo json_encode(["status" => "error", "message" => "MISSING DATA"]);
    exit;
}

$memberName = strtolower(str_replace(' ', '_', preg_replace('/[^a-zA-Z0-9 ]/', '', $input['member_name'])));
$userEmail = $input['user_email'] ?? "SYSTEM";

$targetDir = "../team_assets/"; // Path: public_html/team_assets/
if (!file_exists($targetDir)) mkdir($targetDir, 0755, true);

$fileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
$finalFileName = $memberName . "." . $fileType;
$targetFile = $targetDir . $finalFileName;

// CHECK FILE TYPE
$allowedTypes = ["jpg", "jpeg", "png", "webp"];
if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(["status" => "error", "message" => "ONLY JPG, PNG, WEBP ALLOWED"]);
    exit;
}

// UPLOAD AND LOG
if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
    // WRITE TO LIVE LOG TABLE
    $logMsg = "UPLOADED IMAGE FOR: " . $input['member_name'] . " (Saved as: " . $finalFileName . ")";
    $stmt = $conn->prepare("INSERT INTO logs (action, user_email) VALUES (?, ?)");
    $stmt->bind_param("ss", $logMsg, $userEmail);
    $stmt->execute();
    
    echo json_encode([
        "status" => "success", 
        "message" => "UPLOADED SUCCESSFULLY",
        "url" => "https://vre.pes.edu/team_assets/" . $finalFileName
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "SERVER ERROR: UPLOAD FAILED"]);
}

$conn->close();
?>
