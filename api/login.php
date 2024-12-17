<?php
require_once 'cors_enable.php';

session_start(); 

require_once 'db.php';

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
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role']; 

            echo json_encode([
                'message' => 'Sikeres bejelentkezés!',
                'role' => $user['role'], 
                'user_id' => $user['id'], 
                'username' => $user['username'] 
            ]);
        } else {
            echo json_encode(['message' => 'Helytelen email vagy jelszó!']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Hiba történt: ' . $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => '405 - A POST módszer nem engedélyezett.']);
}
?>
