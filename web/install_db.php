<?php
// Activer l'affichage des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Paramètres de connexion
$servername = "localhost";
$username = "root";
$password = "";

echo "Tentative de connexion à MySQL...<br>";

// Créer la connexion
$conn = new mysqli($servername, $username, $password);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

echo "Connexion réussie à MySQL!<br>";

// Créer la base de données
$sql = "CREATE DATABASE IF NOT EXISTS game_users";
if ($conn->query($sql) === TRUE) {
    echo "Base de données créée avec succès<br>";
} else {
    echo "Erreur lors de la création de la base de données: " . $conn->error . "<br>";
}

// Sélectionner la base de données
$conn->select_db("game_users");

// Créer la table utilisateurs
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table 'users' créée avec succès<br>";
} else {
    echo "Erreur lors de la création de la table: " . $conn->error . "<br>";
}

// Fermer la connexion
$conn->close();

echo "<p>Installation terminée. <a href='projett.html'>Retour à la page de connexion</a></p>";
?> 