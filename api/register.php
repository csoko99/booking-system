<?php
require_once 'db.php';
require_once 'cors_enable.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        die("Minden mező kitöltése kötelező!");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $hashedPassword
        ]);
        echo "Sikeres regisztráció!";
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') { 
            die("Ez az email már létezik!");
        } else {
            die("Hiba történt: " . $e->getMessage());
        }
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo "405 - A POST módszer nem engedélyezett.";
}
?>
