<?php
namespace Database;

// initiateur et entête pour permettre l'accès distant sur le serveur PHP et donc ses fichiers
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

class Dbase {
    private $server = 'localhost';
    private $dbname = 'quiz';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new \PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            // echo 'Good'; // Display message if connection is successful
            return $conn;
        } catch (\PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
            echo 'A connection error occurred.';
        }
    }
}

// Create an instance and test the connection
$db = new Dbase();
$db->connect();
?>
