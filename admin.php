<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $adminToken = $headers['Authorization'];
        include("db_config1.php");


        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT * FROM admin_tokens WHERE admin_token = :admin_token AND expiry_time > NOW()");
        $stmt->bindParam(':admin_token', $adminToken);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $admin_id = $row['admin_id'];


            $stmt = $pdo->prepare("SELECT * FROM admin WHERE admin_id = :admin_id");
            $stmt->bindParam(':admin_id', $admin_id);
            $stmt->execute();

            $admin_data = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($admin_data) {
                $response['success'] = true;
                $response['admin_data'] = $admin_data;
            } else {
                $response['success'] = false;
                $response['message'] = "Admin not found.";
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
