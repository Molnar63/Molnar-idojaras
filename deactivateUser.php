<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $adminToken = $headers['Authorization'];
        include("db_config1.php");

        $data = json_decode(file_get_contents("php://input"));


        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT * FROM admin_tokens WHERE admin_token = :admin_token AND expiry_time > NOW()");
        $stmt->bindParam(':admin_token', $adminToken);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {

            if (isset($data->user_id)) {
                $userId = $data->user_id;


                $stmt = $pdo->prepare("UPDATE user SET activated = 1 - activated WHERE user_id = :user_id");
                $stmt->bindParam(':user_id', $userId);
                $stmt->execute();

                $response['success'] = true;
                $response['message'] = "User activation status updated successfully.";
            } else {
                $response['success'] = false;
                $response['message'] = "Missing user_id parameter.";
            }
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
