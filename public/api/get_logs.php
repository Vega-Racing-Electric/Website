<?php
// VRE LIVE OPERATION LOG - Fetches 20 most recent actions
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$stmt = $conn->prepare("SELECT id, action, user_email, timestamp FROM logs ORDER BY timestamp DESC LIMIT 25");
$stmt->execute();
$result = $stmt->get_result();

$logs = [];
while ($row = $result->fetch_assoc()) {
    $logs[] = $row;
}

echo json_encode($logs);

$stmt->close();
$conn->close();
?>
