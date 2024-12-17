<?php
require_once 'cors_enable.php';
session_start();
session_unset(); 
session_destroy(); 
echo "Sikeres kijelentkezés!";
?>
