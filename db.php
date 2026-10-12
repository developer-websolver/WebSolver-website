<?php

$host = "localhost";
$username = "u999269451_websolverform";
$password = "Websolver@123";
$database = "u999269451_websolverform";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
