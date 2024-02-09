<?php

include("db_config1.php");
try {

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $admin_name = 'admin1';
    $admin_password = 'Admin123';
    $admin_email = 'weatheradmin1@gmail.com';


    $hashedPassword = password_hash($admin_password, PASSWORD_DEFAULT);


    $stmt = $pdo->prepare("INSERT INTO admin (admin_name, admin_password, admin_email) VALUES (:admin_name, :admin_password, :admin_email)");
    $stmt->bindParam(":admin_name", $admin_name);
    $stmt->bindParam(":admin_password", $hashedPassword);
    $stmt->bindParam(":admin_email", $admin_email);
    $stmt->execute();


    $stmt = $pdo->prepare("SELECT * FROM admin WHERE admin_name = :admin_name");
    $stmt->bindParam(":admin_name", $admin_name);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    var_dump($result);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
