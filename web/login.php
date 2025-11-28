<?php
// Démarrer la session
session_start();

// Inclure le fichier de configuration
require_once 'config.php';

// Traiter le formulaire de connexion
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Rechercher l'utilisateur dans la base de données
    $sql = "SELECT id, nom, email, mot_de_passe FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Vérifier le mot de passe
        if (password_verify($password, $user['mot_de_passe'])) {
            // Mot de passe correct, créer une session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nom'];
            $_SESSION['user_email'] = $user['email'];
            
            // Rediriger vers la page du jeu
            header("Location: game.php");
            exit;
        } else {
            // Mot de passe incorrect
            echo "<script>alert('Email ou mot de passe incorrect!'); window.location.href='projett.html';</script>";
        }
    } else {
        // Utilisateur non trouvé
        echo "<script>alert('Email ou mot de passe incorrect!'); window.location.href='projett.html';</script>";
    }
    
    $stmt->close();
}

$conn->close();
?> 