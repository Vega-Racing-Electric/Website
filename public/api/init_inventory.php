<?php
// VRE INVENTORY MIGRATION
header('Content-Type: application/json');
require_once 'config.php';

// 1. Create Inventory Table
$conn->query("CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    count VARCHAR(100),
    owner VARCHAR(255) DEFAULT 'Vega',
    description TEXT,
    location VARCHAR(255),
    category VARCHAR(100),
    added_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// 2. Create Submissions Table (for approval workflow)
$conn->query("CREATE TABLE IF NOT EXISTS inventory_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    count VARCHAR(100),
    owner VARCHAR(255) DEFAULT 'Vega',
    description TEXT,
    location VARCHAR(255),
    category VARCHAR(100),
    submitted_by VARCHAR(255),
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

echo json_encode(["status" => "success", "message" => "Inventory tables initialized."]);
$conn->close();
?>
