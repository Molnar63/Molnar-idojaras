<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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

            $data = json_decode(file_get_contents("php://input"), true);
            $city = $data['city'];
            $latitude = $data['latitude'];
            $longitude = $data['longitude'];


            $checkStmt = $pdo->prepare("SELECT * FROM favorites WHERE user_id = :user_id AND city = :city");
            $checkStmt->bindParam(':user_id', $user_id);
            $checkStmt->bindParam(':city', $city);
            $checkStmt->execute();

            $existingFavorite = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if (!$existingFavorite) {

                $insertStmt = $pdo->prepare("INSERT INTO favorites (user_id, city, latitude, longitude) VALUES (:user_id, :city, :latitude, :longitude)");
                $insertStmt->bindParam(':user_id', $user_id);
                $insertStmt->bindParam(':city', $city);
                $insertStmt->bindParam(':latitude', $latitude);
                $insertStmt->bindParam(':longitude', $longitude);
                $insertStmt->execute();

                $response['success'] = true;
                $response['message'] = "City added to favorites successfully!";
            } else {
                $response['success'] = false;
                $response['message'] = "City is already a favorite.";
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
