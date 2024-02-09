<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'vendor/autoload.php';
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include("db_config1.php");

    $data = json_decode(file_get_contents("php://input"), true);
    $user_email = $data['user_email'];

    $mail = new PHPMailer(true);

    // Uncomment the following line for SMTP debugging
    // $mail->SMTPDebug = 3;

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dural.163163@gmail.com'; //Your gmail
    $mail->Password = 'oanh aikq uuvt nazf'; // Your gmail app pw
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('dural.163163@gmail.com'); //your email
    $mail->addAddress($user_email);
    $mail->isHTML(true);

    // Subject
    $subject = "Password Recovery";

    // Message
    $message = "http://localhost:3000/forgotpwsite";

    $mail->Subject = $subject;
    $mail->Body = $message;

    if ($mail->send()) {
        $response['success'] = true;
        $response['message'] = "Email sent successfully!";
    } else {
        $response['success'] = false;
        $response['message'] = "Error: Email sending failed.";
    }

    echo json_encode($response);
    exit();
}
