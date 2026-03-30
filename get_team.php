<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

/**
 * VEGA RACING ELECTRIC: SHEETS PROXY
 * This script fetches data from Google Sheets, strips sensitive columns (beyond column 7),
 * and serves it as clean JSON to the website.
 */

// --- PASTE YOUR GOOGLE SHEET CSV LINK HERE ---
$google_sheet_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlU5Q0ePJscfmMj1WeQX0pn_nFNAWA6yRA1kfMDtvTys0WLHHNoZJ-J806cjgMChj0C2vVqdi11Mon/pub?gid=22774327&single=true&output=csv";

// Fetch the CSV
$csvData = file_get_contents($google_sheet_url);
if ($csvData === false) {
    echo json_encode(["error" => "Fetch failed from Google Sheets"]);
    exit;
}

// Convert CSV string to array rows
$rows = array_map('str_getcsv', explode("\n", $csvData));

// Remove the header row
$header = array_shift($rows); 

$team = [];

foreach ($rows as $row) {
    // Skip row if Name (column 0) is empty
    if (empty($row[0])) continue;

    /**
     * GOOGLE SHEET COLUMNS:
     * 0: Name
     * 1: Domain
     * 2: Years Active (comma-separated: 2023, 2024)
     * 3: Roles (comma-separated: Lead, Captain)
     * 4: LinkedIn
     * 5: GitHub
     * 6: Instagram
     * 7: Image
     */

    // Processing years and roles for the frontend batch logic
    $yearsStr = (isset($row[2])) ? $row[2] : "";
    $rolesStr = (isset($row[3])) ? $row[3] : "";

    $yearsArr = array_map('trim', explode(',', $yearsStr));
    $rolesArr = array_map('trim', explode(',', $rolesStr));
    
    // Map each year to its role (or fallback to the last role)
    $rolesByYear = [];
    foreach ($yearsArr as $idx => $year) {
        $rolesByYear[$year] = isset($rolesArr[$idx]) ? $rolesArr[$idx] : (end($rolesArr) ?: "Team Member");
    }

    // Curated output - any column beyond 7 is ignored
    $team[] = [
        "name" => $row[0],
        "subsystem" => $row[1] ?? "",
        "years" => $yearsArr,
        "rolesByYear" => $rolesByYear,
        "linkedin" => $row[4] ?? "",
        "github" => $row[5] ?? "",
        "instagram" => $row[6] ?? "",
        "image" => $row[7] ?? "/images/Team/placeholder.png"
    ];
}

// Return the curated result as JSON
echo json_encode($team);
?>
