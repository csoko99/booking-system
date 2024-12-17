<?php
require_once 'db.php';
require_once 'cors_enable.php';
session_start();  // A session kezelése

// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Nem vagy bejelentkezve.']);
    exit;
}

// A bejelentkezett felhasználó ID-ját lekérjük
$user_id = $_SESSION['user_id'];

// Debug: Kiíratjuk a user_id-t, hogy lássuk, van-e érték
error_log("Session user_id: " . $user_id);

try {
    // Csak a bejelentkezett felhasználó foglalásait kérjük le
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

    // Debug: Kiírjuk, hogy milyen foglalásokat találtunk
    error_log("Bookings found: " . print_r($bookings, true));

    echo json_encode($bookings);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Hiba történt: ' . $e->getMessage()]);
}
?>
