<?php
require_once 'db.php';
require_once 'cors_enable.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $host_id = $data['host_id'] ?? null;
    $name = $data['name'] ?? '';
    $address = $data['address'] ?? '';
    $price = $data['price'] ?? 0;
    $description = $data['description'] ?? '';
    $image_url = $data['image_url'] ?? '';

    if (!$host_id || empty($name) || empty($address) || empty($price) || empty($description)) {
        echo json_encode(['message' => 'Minden mező kitöltése kötelező!']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO listings (host_id, name, address, price, description, image_url) 
                               VALUES (:host_id, :name, :address, :price, :description, :image_url)");
        $stmt->execute([
            ':host_id' => $host_id,
            ':name' => $name,
            ':address' => $address,
            ':price' => $price,
            ':description' => $description,
            ':image_url' => $image_url,
        ]);

        echo json_encode(['message' => 'Szállás sikeresen feltöltve!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - Csak POST módszer engedélyezett.']);
}
?>
