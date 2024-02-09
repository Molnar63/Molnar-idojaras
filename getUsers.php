<?php
// getUsers.php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("db_config1.php");

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $adminToken = $headers['Authorization'];


        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT * FROM admin_tokens WHERE admin_token = :admin_token AND expiry_time > NOW()");
        $stmt->bindParam(':admin_token', $adminToken);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {

            $stmt = $pdo->prepare("SELECT * FROM user");
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $response['success'] = true;
            $response['users'] = $users;
        } else {
            $response['success'] = false;
            $response['message'] = "Invalid or expired admin token.";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Authorization header missing.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
