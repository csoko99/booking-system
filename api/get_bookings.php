<?php
require_once 'db.php';
require_once 'cors_enable.php';
session_start();  


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Nem vagy bejelentkezve.']);
    exit;
}

$user_id = $_SESSION['user_id'];

error_log("Session user_id: " . $user_id);

try {
    $stmt = $pdo->prepare("
        SELECT 
            bookings.id AS booking_id,
            listings.name AS listing_name,
            bookings.start_date,
            bookings.end_date,
            bookings.guests,
            bookings.total_price
        FROM 
            bookings
        JOIN 
            listings ON bookings.listing_id = listings.id
        WHERE 
            bookings.user_id = :user_id
    ");
    
    $stmt->execute([':user_id' => $user_id]);

    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    error_log("Bookings found: " . print_r($bookings, true));

    echo json_encode($bookings);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Hiba történt: ' . $e->getMessage()]);
}
?>
