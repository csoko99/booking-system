<?php
require_once 'db.php';
require_once 'cors_enable.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $host_id = $_GET['host_id'] ?? null; 

    if (!$host_id) {
        echo json_encode(['message' => 'Host ID szükséges a lekéréshez!']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM listings WHERE host_id = :host_id");
        $stmt->execute([':host_id' => $host_id]);
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($listings);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - Csak GET módszer engedélyezett.']);
}
?>
