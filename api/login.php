<?php
session_start(); // Session indítása

require_once 'db.php';
require_once 'cors_enable.php';

// Ellenőrizzük, hogy a kérés valóban POST típusú-e
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON beolvasása
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['message' => 'Minden mező kitöltése kötelező!']);
        exit;
    }

    try {
        // Lekérdezzük a felhasználót az adatbázisból
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Sikeres bejelentkezés esetén session létrehozása
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role']; // Role mentése

            // Válasz visszaküldése JSON formátumban
            echo json_encode([
                'message' => 'Sikeres bejelentkezés!',
                'role' => $user['role'], // Role visszaküldése
                'user_id' => $user['id'], // User ID visszaküldése
                'username' => $user['username'] // User name visszaküldése
            ]);
        } else {
            echo json_encode(['message' => 'Helytelen email vagy jelszó!']);
        }
    } catch (PDOException $e) {
        // Hibás SQL lekérdezés vagy egyéb hiba esetén
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    // Ha nem POST kérés, akkor 405-öt küldünk vissza
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - A POST módszer nem engedélyezett.']);
}
?>
