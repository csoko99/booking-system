<?php
require_once 'cors_enable.php';
session_start();
session_unset(); // Az összes session adat törlése
session_destroy(); // A session lezárása
echo "Sikeres kijelentkezés!";
?>
