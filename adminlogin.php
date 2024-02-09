<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 'On');
error_reporting(E_ALL);
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include("db_config1.php");

    $data = json_decode(file_get_contents("php://input"), true);
    $admin_password = $data['admin_password'];
    $admin_email = $data['admin_email'];


    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM admin WHERE admin_email = :admin_email");
    $stmt->bindParam(':admin_email', $admin_email);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $admin_id = $row['admin_id'];
        $admin_name = $row['admin_name'];
        $storedPassword = $row['admin_password'];

        if (password_verify($admin_password, $storedPassword)) {

            $admin_token = bin2hex(random_bytes(32));
            $expiry_time = date('Y-m-d H:i:s', strtotime('+2 hours'));
            $stmt = $pdo->prepare("INSERT INTO admin_tokens (admin_token, expiry_time, admin_id) VALUES (:admin_token, :expiry_time, :admin_id)");
            $stmt->bindParam(':admin_token', $admin_token);
            $stmt->bindParam(':expiry_time', $expiry_time);
            $stmt->bindParam(':admin_id', $admin_id);
            $stmt->execute();

            $response['success'] = true;
            $response['message'] = "Admin Login successful!";
            $response['admin_data'] = array(
                'admin_id' => $admin_id,
                'admin_name' => $admin_name,
                'admin_email' => $admin_email,
                'admin_token' => $admin_token
            );
        } else {
            $response['success'] = false;
            $response['message'] = "Incorrect email or password!";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Incorrect email or password!";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
