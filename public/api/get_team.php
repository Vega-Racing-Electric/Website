<?php
// VRE SECURE API - MySQL Team Data (Instant Load - No Lag)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// FETCH ALL MEMBERS FROM THE NEW FAST TABLE
$stmt = $conn->prepare("SELECT * FROM members ORDER BY subsystem ASC, name ASC");
$stmt->execute();
$result = $stmt->get_result();

$team = [];
while ($row = $result->fetch_assoc()) {
    $yearsArr = array_map('trim', explode(',', $row['years']));
    $rolesArr = array_map('trim', explode(',', $row['role']));
    
    $rolesByYear = [];
    foreach ($yearsArr as $index => $year) {
        $rolesByYear[$year] = $rolesArr[$index] ?? end($rolesArr);
    }
    
    $row['years'] = $yearsArr;
    $row['rolesByYear'] = $rolesByYear;
    $row['role'] = end($rolesArr) ?: $row['role']; // Default role is latest

    $team[] = $row;
}

echo json_encode($team);

$stmt->close();
$conn->close();
?>
