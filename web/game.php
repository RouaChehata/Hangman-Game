<?php
// Démarrer la session
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    // Rediriger vers la page de connexion si non connecté
    header("Location: projett.html");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Jeu</title>
    <link rel="stylesheet" href="projett.css">
    <style>
        .game-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        h1 {
            color: #333;
        }
        
        .logout-btn {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
        
        .game-area {
            margin-top: 30px;
            border: 2px solid #333;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user_name']); ?> !</h1>
        <p>Vous êtes maintenant connecté et pouvez jouer au jeu.</p>
        
        <div class="game-area">
            Zone de jeu - Implémentez votre jeu ici
        </div>
        
        <form action="logout.php" method="post">
            <button type="submit" class="logout-btn">Se déconnecter</button>
        </form>
    </div>
</body>
</html> 