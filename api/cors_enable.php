<?php
// Engedélyezi a hozzáférést minden doménről
header("Access-Control-Allow-Origin: *");

// Engedélyezi a következő HTTP metódusokat
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Engedélyezi a következő fejléceket a kérésben
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Ha a kérelem egy előzetes (OPTIONS) kérés, akkor válaszoljunk OK-val
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>

