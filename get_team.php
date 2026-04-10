<?php
// Secure PHP proxy for Vega Racing Electric - Team Data with High-Speed Caching
// Prevents sensitive Google Sheets URLs from being exposed and avoids "Publish to Web" delay.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$google_sheet_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlU5Q0ePJscfmMj1WeQX0pn_nFNAWA6yRA1kfMDtvTys0WLHHNoZJ-J806cjgMChj0C2vVqdi11Mon/pub?gid=22774327&single=true&output=csv";
$cache_file = 'team_cache.json';
$cache_time = 300; // Cache for 5 minutes (300 seconds)

// 1. CHECK IF CACHE IS FRESH
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_time)) {
    echo file_get_contents($cache_file);
    exit;
}

// 2. FETCH NEW DATA (If cache is old or missing)
$context = stream_context_create([
    "http" => ["header" => "User-Agent: Mozilla/5.0 (VRE Team Fetcher)\r\n"]
]);

$csvData = file_get_contents($google_sheet_url . "&t=" . time(), false, $context);

if ($csvData === false) {
    // If fetch fails, serve old cache as fallback if available
    if (file_exists($cache_file)) {
        echo file_get_contents($cache_file);
    } else {
        echo json_encode(["error" => "Could not reach database"]);
    }
    exit;
}

// 3. PARSE AND FILTER CSV DATA
$lines = explode("\n", str_replace("\r", "", $csvData));
$team = [];

// Skip the header row
for ($i = 1; $i < count($lines); $i++) {
    $row = str_getcsv($lines[$i]);
    
    // Ensure we have at least basic columns
    if (count($row) < 5 || empty($row[0])) continue;

    $member = [
        "name"      => $row[0] ?? "",
        "subsystem" => $row[1] ?? "",
        "years"     => array_map('trim', explode(',', $row[2] ?? "")),
        "role"      => $row[3] ?? "",
        "linkedin"  => $row[4] ?? "",
        "github"    => $row[5] ?? "",
        "instagram" => $row[6] ?? "",
        "image"     => $row[7] ?? "",
        "email"     => $row[8] ?? "" // Assuming email is in Column I
    ];
    
    $team[] = $member;
}

// 4. SAVE TO CACHE AND RETURN
$json_output = json_encode($team);
file_put_contents($cache_file, $json_output);
echo $json_output;
?>