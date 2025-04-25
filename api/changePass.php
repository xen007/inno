<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'db.php'; // Include the Dbase class

// Instantiate the database connection
$db = new \Database\Dbase(); // Use the namespace
$db_connect = $db->connect();

if (!$db_connect) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed.']));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $previousPassword = $data['previousPassword'];
    $newPassword = $data['newPassword'];
    $username = $data['username'];
    $matricule = $data['matricule'];

    // Check if the user exists and retrieve the password
    $sql = "SELECT password FROM users WHERE username = ? OR id_matricule = ?";
    $stmt = $db_connect->prepare($sql);
    $stmt->execute([$username, $matricule]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($previousPassword, $user['password'])) {
        // Update the password
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $update_sql = "UPDATE users SET password = ? WHERE id_matricule = ?";
        $update_stmt = $db_connect->prepare($update_sql);

        if ($update_stmt->execute([$newPasswordHash, $matricule])) {
            echo json_encode(['success' => true, 'message' => 'Password changed successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to change password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Previous password is incorrect.']);
    }
}
?>
