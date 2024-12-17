<?php
require_once 'db.php';  // Az adatbázis kapcsolatot kezelő fájl
require_once 'cors_enable.php';  // A CORS engedélyezése

// Ellenőrizzük, hogy a kérés valóban POST típusú-e
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON beolvasása
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $phone = $data['phone'] ?? '';

    if (empty($username) || empty($email) || empty($password) || empty($phone)) {
        echo json_encode(['message' => 'Minden mező kitöltése kötelező!']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM hosts WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(['message' => 'Ez az e-mail cím már regisztrálva van!']);
            exit;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO hosts (username, email, password, phone, role) VALUES (:username, :email, :password, :phone, 'host')");
        $stmt->execute([':username' => $username, ':email' => $email, ':password' => $hashed_password, ':phone' => $phone]);

        echo json_encode(['message' => 'Sikeres regisztráció!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - A POST módszer nem engedélyezett.']);
}
?>
