// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const homeScreen = document.querySelector('.home-screen-container');
    const categoryScreen = document.querySelector('.category-container');
    const gameScreen = document.querySelector('.game-screen');
    const instructionScreen = document.querySelector('.instruction-container');
    const pauseMenu = document.querySelector('.pause-menu-container');
    const menuHeader = document.querySelector('.menu-header');
    const gameHeader = document.querySelector('.game-screen-header');
    
    // Boutons
    const playBtn = document.querySelector('.play-btn');
    const howToBtn = document.querySelector('.how-to-btn');
    const backBtn = document.querySelector('.back-btn');
    const pauseBtn = document.querySelector('.pause-menu-btn');
    const continueBtn = document.querySelector('.continue-game-btn');
    const newCategoryBtn = document.querySelector('.new-category-btn');
    const quitBtn = document.querySelector('.quit-game-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Variables du jeu
    let currentWord = '';
    let currentCategory = '';
    let incorrectGuesses = 0;
    const maxIncorrectGuesses = 8;
    
    // Afficher l'écran d'accueil au démarrage
    showScreen(homeScreen);
    
    // Gestionnaires d'événements
    playBtn.addEventListener('click', function() {
      hideScreen(homeScreen);
      showScreen(categoryScreen);
    });
    
    howToBtn.addEventListener('click', function() {
      hideScreen(homeScreen);
      showScreen(instructionScreen);
      showScreen(menuHeader);
    });
    
    backBtn.addEventListener('click', function() {
      hideScreen(instructionScreen);
      hideScreen(menuHeader);
      showScreen(homeScreen);
    });
    
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.value;
        startGame(category);
      });
    });
    
    pauseBtn.addEventListener('click', function() {
      showScreen(pauseMenu);
    });
    
    continueBtn.addEventListener('click', function() {
      hideScreen(pauseMenu);
    });
    
    newCategoryBtn.addEventListener('click', function() {
      hideScreen(pauseMenu);
      hideScreen(gameScreen);
      hideScreen(gameHeader);
      showScreen(categoryScreen);
    });
    
    quitBtn.addEventListener('click', function() {
      hideScreen(pauseMenu);
      hideScreen(gameScreen);
      hideScreen(gameHeader);
      showScreen(homeScreen);
    });
    
    // Fonctions utilitaires
    function showScreen(element) {
      element.classList.remove('display-none');
    }
    
    function hideScreen(element) {
      element.classList.add('display-none');
    }
    
    function startGame(category) {
      // Réinitialiser les variables du jeu
      incorrectGuesses = 0;
      currentCategory = category;
      
      // Afficher l'écran de jeu
      hideScreen(categoryScreen);
      showScreen(gameScreen);
      showScreen(gameHeader);
      
      // Mettre à jour l'en-tête de catégorie
      document.querySelector('.category-header').textContent = category;
      
      // Initialiser le jeu
      initializeGame(category);
    }
    
    function initializeGame(category) {
      // Exemple de mots par catégorie
      const words = {
        'Movies': ['AVATAR', 'INCEPTION', 'TITANIC', 'JOKER', 'INTERSTELLAR'],
        'Tv Shows': ['FRIENDS', 'BREAKING BAD', 'GAME OF THRONES', 'STRANGER THINGS'],
        'Countries': ['FRANCE', 'JAPAN', 'BRAZIL', 'CANADA', 'AUSTRALIA'],
        'Capital Cities': ['PARIS', 'TOKYO', 'LONDON', 'BERLIN', 'ROME'],
        'Animals': ['ELEPHANT', 'GIRAFFE', 'DOLPHIN', 'PENGUIN', 'TIGER'],
        'Sports': ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'SWIMMING', 'VOLLEYBALL']
      };
      
      // Vérifier si la catégorie existe
      if (!words[category] || words[category].length === 0) {
        console.error("Catégorie non trouvée ou vide:", category);
        return;
      }
      
      // Sélectionner un mot aléatoire de la catégorie
      const randomIndex = Math.floor(Math.random() * words[category].length);
      currentWord = words[category][randomIndex];
      console.log("Mot choisi:", currentWord); // Pour le débogage
      
      // Créer les tuiles pour les lettres cachées
      createHiddenWordTiles(currentWord);
      
      // Réinitialiser le clavier
      setupKeyboard();
      
      // Réinitialiser la barre de progression
      document.querySelector('.progress-bar').style.width = '100%';
    }
    
    function createHiddenWordTiles(word) {
      const container = document.querySelector('.hidden-word-container');
      
      // Vider le conteneur
      container.innerHTML = '';
      
      // Vérifier si le mot est valide
      if (!word || word.length === 0) {
        console.error("Mot invalide:", word);
        return;
      }
      
      console.log("Création des tuiles pour le mot:", word);
      
      // Créer une tuile pour chaque lettre
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        
        // Ignorer les espaces
        if (letter === ' ') {
          const spacer = document.createElement('div');
          spacer.style.width = '20px';
          container.appendChild(spacer);
          continue;
        }
        
        // Créer la tuile
        const tile = document.createElement('div');
        tile.className = 'hidden-letter-tile';
        tile.setAttribute('data-letter', letter);
        
        // Créer la face avant (cachée)
        const front = document.createElement('div');
        front.className = 'hidden-letter-front';
        
        // Créer la face arrière (lettre)
        const back = document.createElement('div');
        back.className = 'hidden-letter-back';
        back.innerHTML = `<h3>${letter}</h3>`;
        
        // Assembler la tuile
        tile.appendChild(front);
        tile.appendChild(back);
        container.appendChild(tile);
        
        console.log(`Tuile créée pour la lettre "${letter}" à la position ${i}`);
      }
    }
    
    function setupKeyboard() {
      // Sélectionner tous les boutons du clavier
      const keyButtons = document.querySelectorAll('.key-btn');
      
      // Vérifier si les boutons existent
      if (keyButtons.length === 0) {
        console.error("Aucun bouton de clavier trouvé");
        return;
      }
      
      console.log(`Configuration de ${keyButtons.length} touches de clavier`);
      
      // Pour chaque bouton
      keyButtons.forEach(button => {
        // Réinitialiser l'état du bouton
        button.classList.remove('inactive-key');
        button.disabled = false;
        
        // Obtenir la valeur de la lettre
        const letter = button.getAttribute('value');
        
        // Vérifier si la lettre est valide
        if (!letter || letter.length !== 1) {
          console.warn(`Bouton avec valeur invalide: "${letter}"`);
          return;
        }
        
        // Corriger le texte affiché si nécessaire
        const letterDisplay = button.querySelector('h3');
        if (letterDisplay && letterDisplay.textContent !== letter) {
          letterDisplay.textContent = letter;
        }
        
        // Supprimer les anciens écouteurs d'événements
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Ajouter un nouvel écouteur d'événements
        newButton.addEventListener('click', function() {
          console.log(`Lettre cliquée: "${letter}"`);
          guessLetter(letter);
          this.classList.add('inactive-key');
          this.disabled = true;
        });
      });
    }
    
    function guessLetter(letter) {
      // Vérifier si la lettre est valide
      if (!letter || letter.length !== 1) {
        console.error("Lettre invalide:", letter);
        return;
      }
      
      console.log(`Vérification de la lettre: "${letter}"`);
      
      // Convertir la lettre en minuscule pour la comparaison
      const lowerLetter = letter.toLowerCase();
      
      // Sélectionner toutes les tuiles
      const tiles = document.querySelectorAll('.hidden-letter-tile');
      
      // Vérifier si des tuiles existent
      if (tiles.length === 0) {
        console.error("Aucune tuile trouvée");
        return;
      }

      let letterFound = false;

      // Vérifier chaque tuile
      tiles.forEach(tile => {
        const tileLetter = tile.getAttribute('data-letter').toLowerCase();
        if (tileLetter === lowerLetter) {
          // Révéler la lettre
          tile.classList.add('reveal-lettre');
          letterFound = true;
        }
      });

      // Si la lettre n'est pas trouvée, augmenter le compteur d'erreurs
      if (!letterFound) {
        incorrectGuesses++;
        updateProgressBar();
      }

      // Vérifier si le joueur a gagné ou perdu
      checkWin();
    }

    function updateProgressBar() {
      const progressBar = document.querySelector('.progress-bar');
      const percentage = ((maxIncorrectGuesses - incorrectGuesses) / maxIncorrectGuesses) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    function checkWin() {
      const tiles = document.querySelectorAll('.hidden-letter-tile');
      const allRevealed = Array.from(tiles).every(tile => tile.classList.contains('reveal-lettre'));
      
      if (allRevealed) {
        // Le joueur a gagné
        alert('Félicitations ! Vous avez gagné !');
        hideScreen(gameScreen);
        hideScreen(gameHeader);
        showScreen(homeScreen);
      } else if (incorrectGuesses >= maxIncorrectGuesses) {
        // Le joueur a perdu
        alert('Game Over ! Le mot était : ' + currentWord);
        hideScreen(gameScreen);
        hideScreen(gameHeader);
        showScreen(homeScreen);
      }
    }
    
    // Ajouter la prise en charge du clavier physique
    document.addEventListener('keydown', function(event) {
      // Vérifier si l'écran de jeu est visible
      if (!gameScreen.classList.contains('display-none') && 
          pauseMenu.classList.contains('display-none')) {
        
        const key = event.key.toLowerCase();
        
        // Vérifier si la touche est une lettre
        if (/^[a-z]$/.test(key)) {
          console.log(`Touche du clavier pressée: "${key}"`);
          
          // Trouver le bouton correspondant
          const keyBtn = document.querySelector(`.key-btn[value="${key}"]`);
          
          // Simuler un clic sur le bouton s'il n'est pas désactivé
          if (keyBtn && !keyBtn.disabled) {
            keyBtn.click();
          }
        }
      }
    });
    
    console.log("Script de jeu Hangman chargé avec succès!");
  });