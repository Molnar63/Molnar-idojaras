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
    $user_password = $data['user_password'];
    $user_email = $data['user_email'];


    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM user WHERE user_email = :user_email");
    $stmt->bindParam(':user_email', $user_email);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $user_id = $row['user_id'];
        $user_name = $row['user_name'];
        $storedPassword = $row['user_password'];
        $activated = $row['activated'];

        if ($activated == 1) {
            if (password_verify($user_password, $storedPassword)) {

                $token = bin2hex(random_bytes(32));
                $expiry_time = date('Y-m-d H:i:s', strtotime('+2 hours'));
                $stmt = $pdo->prepare("INSERT INTO tokens (token, expiry_time, user_id) VALUES (:token, :expiry_time, :user_id)");
                $stmt->bindParam(':token', $token);
                $stmt->bindParam(':expiry_time', $expiry_time);
                $stmt->bindParam(':user_id', $user_id);
                $stmt->execute();

                $response['success'] = true;
                $response['message'] = "Login successful!";
                $response['user_data'] = array(
                    'user_id' => $user_id,
                    'user_name' => $user_name,
                    'user_email' => $user_email,
                    'token' => $token
                );
                echo json_encode($response);
                exit();
            } else {
                $response['success'] = false;
                $response['message'] = "Incorrect email or password!";
            }
        } else {
            $response['success'] = false;
            $response['message'] = "Your account is not activated yet. Please check your email for the activation link.";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Incorrect email or password!";
    }

    echo json_encode($response);
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
    echo json_encode($response);
}
