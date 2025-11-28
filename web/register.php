<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Démarrer la session
session_start();

// Inclure le fichier de configuration
require_once 'config.php';

// Traiter le formulaire d'inscription
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier que tous les champs sont remplis
    if (empty($_POST['nom']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['confirm_password'])) {
        echo "<script>alert('Tous les champs sont obligatoires!'); window.location.href='register.html';</script>";
        exit;
    }

    $nom = trim($_POST['nom']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Vérifier si les mots de passe correspondent
    if ($password !== $confirm_password) {
        echo "<script>alert('Les mots de passe ne correspondent pas!'); window.location.href='register.html';</script>";
        exit;
    }
    
    // Vérifier si l'email existe déjà
    $check_email = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($check_email);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo "<script>alert('Cet email est déjà utilisé!'); window.location.href='register.html';</script>";
        exit;
    }
    
    // Hacher le mot de passe
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insérer les données dans la base de données
    $sql = "INSERT INTO users (nom, email, mot_de_passe) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nom, $email, $hashed_password);
    
    if ($stmt->execute()) {
        // Stocker l'email dans la session
        $_SESSION['email'] = $email;
        $_SESSION['nom'] = $nom;
        
        // Rediriger vers webP2.php
        header("Location: webP2.php");
        exit();
    } else {
        echo "<script>alert('Erreur lors de l\\'inscription: " . $stmt->error . "'); window.location.href='register.html';</script>";
    }
    
    $stmt->close();
}

$conn->close();
?> 