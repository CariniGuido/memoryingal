  // Array de cartas
  const images = [
    "./img/frida.jpg",
    "./img/norma.jpg",
    "./img/guidoo.jpg",
    "./img/anabel.jpg",
    "/img/fer.jpg",
    "/img/patri.jpg",
    "/img/anamaria.jpg",
    "img/luca.jpg",
    "img/kutty.jpg",
    "img/jose.jpg",
    // Agrega más rutas de imágenes para cada par de cartas
  ];

  const cards = [];
  let flippedCard = null;
  let matchedCards = [];
  let waitingTimeout = false;
  let score = 0;
  let attempts = 0;
  const MAX_ATTEMPTS = 10;
  let retryButton;

  // Función para barajar las cartas
  function shuffleCards() {
    const duplicatedImages = [...images, ...images]; // Duplicar las imágenes

    duplicatedImages.forEach((image) => {
      cards.push({
        image: image,
        flipped: false, // Inicialmente, todas las cartas están boca abajo
        matched: false, // Inicialmente, ninguna carta está emparejada
        element: null, // Elemento DOM de la carta
      });
    });

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  // Función para verificar si se ha ganado el juego
  function checkVictory() {
    if (matchedCards.length === cards.length) {
      setTimeout(showVictoryMessage, 500);
      retryButton.disabled = false;
    }
  }

  // Función para mostrar el mensaje de victoria
  function showVictoryMessage() {
    alert(`¡Felicidades, has ganado el juego! Puntuación: ${score}`);
  }

  // Función para aumentar un intento y verificar si se ha perdido
  function increaseAttempt() {
    attempts++;
    if (attempts >= MAX_ATTEMPTS) {
      showFailureMessage();
    }
  }

  // Función para mostrar el mensaje de fracaso
  function showFailureMessage() {
    alert("¡Has perdido! Se agotaron los intentos.");
    retryButton.disabled = false; // Habilitar el botón para volver a intentarlo
  }

  // Función para voltear una carta
  function flipCard(card) {
    if (waitingTimeout || card.flipped || card.matched) {
      return;
    }

    card.flipped = true;

    if (flippedCard === null) {
      flippedCard = card;
    } else {
      if (flippedCard.image === card.image) {
        card.matched = true;
        flippedCard.matched = true;
        matchedCards.push(card, flippedCard);
        score += 1;
        flippedCard = null;
        checkVictory();
      } else {
        waitingTimeout = true;
        setTimeout(() => {
          card.flipped = false;
          flippedCard.flipped = false;
          flippedCard = null;
          waitingTimeout = false;
          updateBoard();
          increaseAttempt();
        }, 1000);
      }
    }

    updateBoard();
  }

  // Función para crear el elemento de la carta
  function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.addEventListener("click", () => flipCard(card));

    const imgElement = document.createElement("img");
    imgElement.src = card.flipped || card.matched ? card.image : "./img/black.png";
    imgElement.alt = "Carta";

    cardElement.appendChild(imgElement);
    card.element = cardElement; // Agregar la propiedad element al objeto card

    return cardElement;
  }

  function updateBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    cards.forEach((card) => {
      const cardElement = createCardElement(card);
      gameBoard.appendChild(cardElement);
    });

    // Mostrar el puntaje en el HTML
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Puntaje: ${score}`;
  }

  // Función para reiniciar el juego
  function restartGame() {
    cards.length = 0;
    flippedCard = null;
    matchedCards.length = 0;
    waitingTimeout = false;
    score = 0;
    attempts = 0;
    retryButton.disabled = true; // Volver a deshabilitar el botón

    shuffleCards();
    updateBoard();
  }

  // Inicialización del juego
  function initGame() {
    retryButton = document.getElementById("retry-button");
    retryButton.addEventListener("click", restartGame);
    retryButton.disabled = true; // Deshabilitar el botón al inicio del juego

    shuffleCards();
    updateBoard();
  }

  // Iniciar el juego cuando se cargue la página
  window.addEventListener("DOMContentLoaded", initGame);
  setTimeout(function() {
    var title = document.querySelector('h1');
    title.style.animation = 'none';
  }, 10000);
