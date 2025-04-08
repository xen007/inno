<?php
require 'db.php';

$db = new \Database\Dbase();
$conn = $db->connect();

try {
    // SQL query to fetch all data
    $questionStmt = $conn->prepare("
        SELECT 
            *
        FROM matiere
        INNER JOIN classe 
        ON matiere.id_classe = classe.id_classe
    ");
    $questionStmt->execute();

    // Fetching results
    $results = $questionStmt->fetchAll(\PDO::FETCH_ASSOC);

    // Preparing JSON response
    $jsonArray = [];
    foreach ($results as $row) {
        $jsonArray[] = [
            'nom_classe' => $row['libelle_classe'],
            'id_classe' => $row['id_classe'],
            'code' => $row['code_classe'],
            'filiere' => $row['filiere'],
            'id_matiere' => $row['id_matiere'],
            'nom_mat' => $row['libelle_mat'],
        ];
    }

    // Encoding and sending JSON response
    echo json_encode($jsonArray);

} catch (\PDOException $e) {
    // Error handling: log the error and send an error response
    error_log('Database query failed: ' . $e->getMessage());
    echo json_encode([
        'error' => 'A database error occurred. Please try again later.'
    ]);
}
?>
