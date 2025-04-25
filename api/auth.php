<?php
include 'db.php'; // Include your database connection class
session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $identifier = $data['username']; // This can be username or matricule
        $password = $data['password'];

        // Create an instance of the Dbase class and establish the database connection
        $db = new \Database\Dbase();
        $db_connect = $db->connect();

        if ($db_connect) {
            // Check if user exists
            $checkUserQuery = "SELECT * FROM users WHERE username = :identifier OR id_matricule = :identifier";
            $checkUserStmt = $db_connect->prepare($checkUserQuery);
            $checkUserStmt->bindParam(':identifier', $identifier);
            $checkUserStmt->execute();
            $user = $checkUserStmt->fetch(\PDO::FETCH_ASSOC);

            if ($user) {
                // Verify user credentials
                if (password_verify($password, $user['password'])) {
                    // Password is hashed and matches
                    $_SESSION['user'] = [
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'matricule' => $user['id_matricule'],
                        'role' => $user['role']
                    ];
                    echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
                } else if ($password === $user['password']) {
                    // Password is unhashed and matches
                    // Hash the password and update the database for future logins
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $updatePasswordQuery = "UPDATE users SET password = :hashedPassword WHERE id = :id";
                    $updatePasswordStmt = $db_connect->prepare($updatePasswordQuery);
                    $updatePasswordStmt->bindParam(':hashedPassword', $hashedPassword);
                    $updatePasswordStmt->bindParam(':id', $user['id']);
                    $updatePasswordStmt->execute();

                    // Update session and respond with success
                    $_SESSION['user'] = [
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'matricule' => $user['id_matricule'],
                        'role' => $user['role']
                    ];
                    echo json_encode(['status' => 'success', 'user' => $_SESSION['user']]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Wrong username or password']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No data received']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
