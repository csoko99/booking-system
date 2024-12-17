<?php
require_once 'db.php';
require_once 'cors_enable.php';
session_start();


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Nem vagy bejelentkezve.']);
    exit;
}


$data = json_decode(file_get_contents('php://input'), true);


if (!isset($data['listing_id'], $data['rating'])) {
    echo json_encode(['error' => 'Hiányzó adat (listing_id vagy rating).']);
    exit;
}

$user_id = $_SESSION['user_id'];
$listing_id = $data['listing_id']; 
$rating = $data['rating'];  
$comment = isset($data['comment']) ? $data['comment'] : '';  

if ($rating < 1 || $rating > 5) {
    echo json_encode(['error' => 'Érvénytelen értékelés. Az értékelésnek 1 és 5 között kell lennie.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO reviews (listing_id, user_id, rating, comment) VALUES (:listing_id, :user_id, :rating, :comment)");
    $stmt->execute([
        ':listing_id' => $listing_id,
        ':user_id' => $user_id,
        ':rating' => $rating,
        ':comment' => $comment
    ]);
    
    echo json_encode(['message' => 'Értékelés sikeresen rögzítve.']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Hiba történt: ' . $e->getMessage()]);
}
?>
