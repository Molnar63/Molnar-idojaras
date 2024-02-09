<?php
session_start();


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if (isset($_POST["send"])) {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dural.163163@gmail.com';
    $mail->Password = 'oanh aikq uuvt nazf';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('dural.163163@gmail.com');


    $mail->addAddress($_POST["forgorpwuser_email"]);

    $mail->isHTML(true);


    $subject = "Password Recovery";


    $message = "http://localhost:3000/forgotpwsite";


    $mail->Subject = $subject;


    $mail->Body = $message;

    $mail->send();

    echo
    "
    <script>
    alert('Sent Successfully');
    document.location.href='index.php';
    </script>
    ";
}
