<?php
require_once 'cors_enable.php';

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'logged_in' => true,
        'username' => $_SESSION['username'],
        'email' => $_SESSION['email']
    ]);
} else {
    http_response_code(401); // Ha nem jelentkezett be
    echo json_encode([
        'logged_in' => false,
        'error' => 'Nincs bejelentkezve'
    ]);
}
?>
