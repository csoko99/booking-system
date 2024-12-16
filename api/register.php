<?php
require_once 'db.php';
require_once 'cors_enable.php';
// Ellenőrizzük, hogy a kérés valóban POST típusú-e
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON beolvasása
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        die("Minden mező kitöltése kötelező!");
    }

    // Jelszó hash-elése
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
        if ($e->getCode() === '23000') { // Duplikált email hiba
            die("Ez az email már létezik!");
        } else {
            die("Hiba történt: " . $e->getMessage());
        }
    }
} else {
    // Ha nem POST kérés, akkor 405-öt küldünk vissza
    header("HTTP/1.1 405 Method Not Allowed");
    echo "405 - A POST módszer nem engedélyezett.";
}
?>
