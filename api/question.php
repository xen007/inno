<?php
require 'db.php';

$db = new \Database\Dbase();
$conn = $db->connect();

try {
    // Capture the data sent from JavaScript
    $jsonData = file_get_contents('php://input'); // Retrieve raw POST data
    $decodedData = json_decode($jsonData, true); // Decode JSON data to PHP array

    // Validate that 'matiere' exists in the received data
    if (!$decodedData || !isset($decodedData['matiere'])) {
        echo json_encode(['error' => 'Invalid data sent to the server.']);
        exit;
    }

    // Extract 'matiere' from the received data
    $id_matiere= $decodedData['matiere']; // Use only the matiere field

    // Query to fetch all questions based on matiere (id_matiere)
    $questionStmt = $conn->prepare("SELECT id_question, libelle_question FROM question WHERE id_matiere= :id_matiere");
    $questionStmt->bindParam(':id_matiere', $id_matiere, \PDO::PARAM_INT);
    $questionStmt->execute();
    $questions = $questionStmt->fetchAll(\PDO::FETCH_ASSOC);

    $json_array = [];

    foreach ($questions as $question) {
        // Fetch all responses for the current question
        $responseStmt = $conn->prepare("SELECT id_reponse, libelle_reponse, is_correct FROM reponse WHERE id_question = :id_question");
        $responseStmt->bindParam(':id_question', $question['id_question'], \PDO::PARAM_INT);
        $responseStmt->execute();

        $options = [];
        $answer = null;

        while ($row = $responseStmt->fetch(\PDO::FETCH_ASSOC)) {
            if ($row['is_correct'] == 1) {
                $answer = $row['libelle_reponse'];
            }
            $options[] = $row['libelle_reponse'];
        }

        // Ensure options are properly assigned to A, B, C, D
        $json_array[] = [
            'question' => $question['libelle_question'],
            'id_question' => $question['id_question'],
            'answer' => $answer,
            'optionA' => $options[0] ?? null,
            'optionB' => $options[1] ?? null,
            'optionC' => $options[2] ?? null,
            'optionD' => $options[3] ?? null,
        ];
    }

    echo json_encode($json_array);

} catch (\PDOException $e) {
    error_log('Query failed: ' . $e->getMessage());
    echo json_encode(['error' => 'A query error occurred: ' . $e->getMessage()]);
}
?>
