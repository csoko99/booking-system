<?php
session_start();
require_once 'db.php';
require_once 'cors_enable.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['message' => 'Minden mező kitöltése kötelező!']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM hosts WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $host = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($host && password_verify($password, $host['password'])) {
            $_SESSION['host_id'] = $host['id'];
            echo json_encode([
                'message' => 'Sikeres bejelentkezés!',
                'host_id' => $host['id']
            ]);
        } else {
            echo json_encode(['message' => 'Helytelen email vagy jelszó!']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - Csak POST módszer engedélyezett.']);
}
?>
