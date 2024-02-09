<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
session_start();
$response = array();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    $response['success'] = false;
    $response['message'] = "User is not logged in.";
    echo json_encode($response);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include("db_config1.php");


    $user_id = $_SESSION['user_id'];


    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM user WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $user_name = $row['user_name'];
        $user_email = $row['user_email'];


        $response['success'] = true;
        $response['user'] = array(
            'user_id' => $user_id,
            'user_name' => $user_name,
            'user_email' => $user_email

        );
    } else {
        $response['success'] = false;
        $response['message'] = "Error fetching user details.";
    }

    echo json_encode($response);
    exit();
}

$response['success'] = false;
$response['message'] = "Invalid request.";
echo json_encode($response);
