<?php
// CORS engedélyezése minden origin számára (frontend, bárhonnan)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// A többi PHP kód...
?>
