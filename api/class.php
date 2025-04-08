<?php
require 'db.php';

// Instantiate the Database class and connect
$db = new \Database\Dbase();
$conn = $db->connect();

try {
    // Preparing the SQL query with correct table name and syntax
    $classetmt = $conn->prepare("
        SELECT 
            id_classe, code_classe, libelle_classe, filiere
        FROM classe
    ");
    $classetmt->execute();

    // Fetching results
    $classe = $classetmt->fetchAll(\PDO::FETCH_ASSOC);

    // Preparing JSON response
    $json_array = [];
    foreach ($classe as $row) {
        $json_array[] = [
            'id_classe' => $row['id_classe'],
            'code' => $row['code_classe'],
            'nom_classe' => $row['libelle_classe'],
            'filiere' => $row['filiere'],
        ];
    }

    // Encoding and sending JSON response
    echo json_encode($json_array);

} catch (\PDOException $e) {
    // Log the error without exposing internal details to the user
    error_log('Query failed: ' . $e->getMessage());
    echo json_encode(['error' => 'An error occurred while processing your request.']);
}
?>
