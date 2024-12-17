<?php
// create_booking.php
require_once 'cors_enable.php';  // CORS engedélyezése
require_once 'db.php';  // Adatbázis kapcsolat importálása

session_start(); // Session indítása

header('Content-Type: application/json');  // A válasz JSON formátum beállítása

// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["message" => "Nincs bejelentkezve a felhasználó."]);
    exit;
}

$user_id = $_SESSION['user_id']; // Használjuk a session-ból a user_id-t
$data = json_decode(file_get_contents("php://input"), true);

// Ha a szükséges adatok hiányoznak
if (!isset($data['listing_id'], $data['start_date'], $data['end_date'], $data['guests'])) {
    echo json_encode(["message" => "Hiányzó szükséges paraméterek."]);
    exit;
}

$listing_id = $data['listing_id'];
$start_date = $data['start_date'];
$end_date = $data['end_date'];
$guests = $data['guests'];

// Ellenőrzés, hogy a dátumok érvényesek-e
if (strtotime($start_date) === false || strtotime($end_date) === false) {
    echo json_encode(["message" => "Érvénytelen dátum formátum."]);
    exit;
}

// Foglalás létrehozása PDO használatával
try {
    $query = "INSERT INTO bookings (listing_id, user_id, start_date, end_date, guests, total_price)
              VALUES (:listing_id, :user_id, :start_date, :end_date, :guests, 
                      (SELECT price FROM listings WHERE id = :listing_id) * DATEDIFF(:end_date, :start_date))";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':listing_id', $listing_id);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':start_date', $start_date);
    $stmt->bindParam(':end_date', $end_date);
    $stmt->bindParam(':guests', $guests);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Foglalás sikeresen rögzítve!"]);
    } else {
        echo json_encode(["message" => "Hiba a foglalás során!"]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "SQL hiba: " . $e->getMessage()]);
}

?>
