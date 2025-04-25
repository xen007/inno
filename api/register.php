<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$matricule = $data['matricule'];
$password = $data['password'];
$confirmPassword = $data['confirmPassword'];
$role = 'user'; // Default role

$response = array();

if (empty($username) || empty($matricule) || empty($password) || empty($confirmPassword) || empty($role)) {
    $response['status'] = 'error';
    $response['message'] = 'All fields are required.';
    echo json_encode($response);
    exit();
}

if ($password !== $confirmPassword) {
    $response['status'] = 'error';
    $response['message'] = 'Passwords do not match.';
    echo json_encode($response);
    exit();
}

// Instantiate the database connection
$db = new \Database\Dbase(); // Use the namespace
$db_connect = $db->connect();

if (!$db_connect) {
    $response['status'] = 'error';
    $response['message'] = 'Database connection failed.';
    echo json_encode($response);
    exit();
}

// Check if username or matricule already exists
$sql = "SELECT id FROM users WHERE username = ? OR id_matricule = ?";
$stmt = $db_connect->prepare($sql);
$stmt->execute([$username, $matricule]);

if ($stmt->rowCount() > 0) {
    $response['status'] = 'error';
    $response['message'] = "Nom d'utilisateur ou matricule existe déjà.";
    echo json_encode($response);
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user into the database
$sql = "INSERT INTO users (username, id_matricule, password, role) VALUES (?, ?, ?, ?)";
$stmt = $db_connect->prepare($sql);

if ($stmt->execute([$username, $matricule, $hashedPassword, $role])) {
    $response['status'] = 'success';
    $response['message'] = 'Registration successful';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Registration failed. Please try again.';
}

echo json_encode($response);
?>
