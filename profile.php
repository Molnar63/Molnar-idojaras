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
        $token = $headers['Authorization'];
        include("db_config1.php");


        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT * FROM tokens WHERE token = :token AND expiry_time > NOW()");
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $user_id = $row['user_id'];


            $stmt = $pdo->prepare("SELECT * FROM user WHERE user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();

            $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user_data) {
                $response['success'] = true;
                $response['user_data'] = $user_data;


                $stmtFavorites = $pdo->prepare("SELECT city FROM favorites WHERE user_id = :user_id");
                $stmtFavorites->bindParam(':user_id', $user_id);
                $stmtFavorites->execute();

                $favorites = $stmtFavorites->fetchAll(PDO::FETCH_COLUMN);
                $response['user_data']['favorites'] = $favorites;


                $stmtLastVisited = $pdo->prepare("
                    SELECT city, date_time
                    FROM views
                    WHERE user_id = :user_id
                    ORDER BY date_time DESC
                    LIMIT 5
                ");
                $stmtLastVisited->bindParam(':user_id', $user_id);
                $stmtLastVisited->execute();

                $lastVisited = $stmtLastVisited->fetchAll(PDO::FETCH_ASSOC);
                $response['last_visited'] = $lastVisited;
            } else {
                $response['success'] = false;
                $response['message'] = "User not found.";
            }
        } else {
            $response['success'] = false;
            $response['message'] = "Invalid or expired token.";
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
