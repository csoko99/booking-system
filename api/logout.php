<?php
session_start();
session_unset(); // Az összes session adat törlése
session_destroy(); // A session lezárása
echo "Sikeres kijelentkezés!";
?>
