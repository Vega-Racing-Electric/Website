<?php
// VRE MASTER KEY GENERATOR - RUN ONCE ON CPANEL
require_once 'config.php';

$password_to_set = "vre2026$";
$email_to_target = "hiteshpranavreddy.d@gmail.com";

$hash = password_hash($password_to_set, PASSWORD_DEFAULT);

echo "<h2>VRE Master Key Generator</h2>";
echo "Password: <b>" . $password_to_set . "</b><br>";
echo "Email: <b>" . $email_to_target . "</b><br><br>";
echo "<b>COPY AND RUN THIS SQL IN phpMyAdmin:</b><br><br>";
echo "<textarea style='width: 100%; height: 80px; font-family: monospace; background: #eee; padding: 10px;'>";
echo "UPDATE users SET password_hash = '" . $hash . "', encrypted_pass = '" . $password_to_set . "' WHERE email = '" . $email_to_target . "';";
echo "</textarea>";
echo "<br><br><b>Then try logging in at vre.pes.edu/admin!<b>";
?>
