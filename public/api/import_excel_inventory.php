<?php
// VRE DEPOT - MASS DATA INGESTION
header('Content-Type: application/json');
require_once 'config.php';

$sql_path = '/tmp/import_inventory.sql';
if (!file_exists($sql_path)) {
    echo json_encode(["status" => "error", "message" => "SQL Import file not found."]);
    exit;
}

$sql = file_get_contents($sql_path);

if ($conn->multi_query($sql)) {
    do {
        if ($res = $conn->store_result()) $res->free();
    } while ($conn->more_results() && $conn->next_result());
    echo json_encode(["status" => "success", "message" => "INVENTORY DATABASE POPULATED FROM AUDIT EXCEL."]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
