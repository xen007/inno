<?php
require 'db.php';

// Instantiate Database and establish a connection
$db = new \Database\Dbase();
$conn = $db->connect();

try {
    // Prepare SQL query with INNER JOIN
    $questionStmt = $conn->prepare("
        SELECT 
            chapitre.id_chapitre AS id_chap,
            chapitre.libelle_chap AS nom_chap,
            matiere.id_matiere AS id_mat,
            matiere.libelle_mat AS nom_mat
        FROM chapitre
        INNER JOIN matiere 
        ON chapitre.id_matiere = matiere.id_matiere
    ");
    $questionStmt->execute();

    // Fetch results
    $questions = $questionStmt->fetchAll(\PDO::FETCH_ASSOC);

    // Prepare JSON response
    $json_array = [];
    foreach ($questions as $question) {
        $json_array[] = [
            'nom_chap' => $question['nom_chap'],
            'id_chap' => $question['id_chap'],
            'id_mat' => $question['id_mat'],
            'nom_mat' => $question['nom_mat'],
        ];
    }

    // Encode and send JSON response
    echo json_encode($json_array);

} catch (\PDOException $e) {
    // Log error internally and send generic error message
    error_log('Query failed: ' . $e->getMessage());
    echo json_encode(['error' => 'An error occurred while processing your request.']);
}
?>
