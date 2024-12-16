<?php
require_once 'cors_enable.php';

$host = "localhost";        // Alapértelmezett MySQL szerver
$dbname = "booking_system"; // Az adatbázis neve
$username = "root";         // phpMyAdmin MySQL felhasználónév
$password = "";             // phpMyAdmin jelszó (alapértelmezetten üres)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    die("Hiba az adatbázis kapcsolódásakor: " . $e->getMessage());
}
?>
