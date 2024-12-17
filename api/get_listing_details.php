<?php
header("Content-Type: application/json");

// PHP hibamegjelenítés fejlesztési környezetben
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once "db.php";

// Ellenőrizzük a listing_id paramétert
if (!isset($_GET['listing_id']) || !is_numeric($_GET['listing_id'])) {
    echo json_encode(['error' => 'Hibás vagy hiányzó szállás azonosító.']);
    exit;
}

$listing_id = (int) $_GET['listing_id'];

// Adatbázis kapcsolat
$conn = new mysqli('localhost', 'root', '', 'booking_system');

if ($conn->connect_error) {
    echo json_encode(['error' => 'Adatbázis kapcsolat hiba: ' . $conn->connect_error]);
    exit;
}

// Szállás adatainak és host elérhetőségének lekérdezése
$query = "
    SELECT 
        listings.name, 
        listings.address, 
        listings.price, 
        listings.description, 
        listings.image_url, 
        hosts.phone AS contact,
        COALESCE(AVG(reviews.rating), 0) AS average_rating
    FROM listings
    LEFT JOIN hosts ON listings.host_id = hosts.id
    LEFT JOIN reviews ON listings.id = reviews.listing_id
    WHERE listings.id = ?
    GROUP BY listings.id
";


$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => 'Lekérdezési hiba: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $listing_id);
$stmt->execute();
$result = $stmt->get_result();

if ($data = $result->fetch_assoc()) {
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'A kért szállás nem található.']);
}

$stmt->close();
$conn->close();
exit;
?>
