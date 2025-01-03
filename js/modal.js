const gameBoard = document.getElementById('gameBoard');
const gameOverModal = document.getElementById('gameOverModal');
const finalScore = document.getElementById('finalScore');
const finalCorrect = document.getElementById('finalCorrect');
const finalErrors = document.getElementById('finalErrors');
const restartGame = document.getElementById('restartGame');
const goToStart = document.getElementById('goToStart');

let matchedCards = 0;
let errors = 0;
const totalCards = 16;

// Função para gerar as cartas (exemplo básico)
function generateCards() {
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.card = Math.floor(i / 2); // Par de cartas
    card.textContent = '?'; // Placeholder
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  }
}

let firstCard = null;
function flipCard(event) {
  const clickedCard = event.target;
  if (clickedCard.classList.contains('matched') || clickedCard === firstCard) return;

  clickedCard.textContent = clickedCard.dataset.card; // Revela a carta
  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    if (clickedCard.dataset.card === firstCard.dataset.card) {
      // Cartas combinam
      matchedCards++;
      clickedCard.classList.add('matched');
      firstCard.classList.add('matched');
      firstCard = null;
      checkEndGame();
    } else {
      // Cartas não combinam
      errors++;
      setTimeout(() => {
        clickedCard.textContent = '?';
        firstCard.textContent = '?';
        firstCard = null;
      }, 1000);
    }
  }
}

// Verifica o fim do jogo
function checkEndGame() {
  if (matchedCards === totalCards / 2) {
    // Mostra o modal
    finalScore.textContent = matchedCards * 10; // Exemplo de pontuação
    finalCorrect.textContent = matchedCards;
    finalErrors.textContent = errors;
    gameOverModal.style.display = 'block';
  }
}

// Eventos dos botões do modal
restartGame.addEventListener('click', () => location.reload());
goToStart.addEventListener('click', () => (window.location.href = 'jogo.html'));

// Inicializa o jogo
generateCards();
