<?php
require_once 'cors_enable.php';

$host = "localhost";
$dbname = "booking_system";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Kapcsolat sikeres!<br>Elérhető táblák:<br>";
    foreach ($tables as $table) {
        echo "- " . $table['Tables_in_booking_system'] . "<br>";
    }
} catch (PDOException $e) {
    die("Hiba: " . $e->getMessage());
}
?>
