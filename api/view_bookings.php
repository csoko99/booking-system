<?php
require_once 'db.php';
require_once 'cors_enable.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM bookings");
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($bookings);
    } catch (PDOException $e) {
        die("Hiba történt a foglalások lekérésekor: " . $e->getMessage());
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo "405 - A GET módszer nem engedélyezett.";
}
?>
