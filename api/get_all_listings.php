<?php
require_once 'db.php';
require_once 'cors_enable.php';

try {
    $stmt = $pdo->query("SELECT * FROM listings");
    $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($listings);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Hiba történt: ' . $e->getMessage()]);
}
?>
