<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("db_config.php");

global $connection;

$errors = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $data = json_decode(file_get_contents("php://input"), true);
    $user_email = $data['user_email'];
    $new_password = $data['new_password'];
    $confirm_password = $data['confirm_password'];

    $query = "SELECT user_password FROM user WHERE user_email = '$user_email'";
    $result = $connection->query($query);

    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        $storedPassword = $userData['user_password'];

        $hashedPassword = password_hash($new_password, PASSWORD_DEFAULT);

        $updateQuery = "UPDATE user SET user_password = '$hashedPassword' WHERE user_email = '$user_email'";
        $connection->query($updateQuery);

        $response['new_password'] = "The password is updated!";
        $_SESSION['errors'] = $response;
    } else {

        $response['new_password'] = "User not found.";
        $_SESSION['errors'] = $response;
    }
    echo json_encode($response);
}
