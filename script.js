const cardGrid = document.getElementById("cardGrid");
const moveCountEl = document.getElementById("moveCount");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

const cardValues = ["🍎", "🍌", "🍇", "🍒"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards() {
  const duplicated = [...cardValues, ...cardValues];
  cards = shuffle(duplicated);

  cardGrid.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;
  moveCount = 0;
  lockBoard = false;
  moveCountEl.textContent = moveCount;
  messageEl.textContent = "";

  cards.forEach((value, index) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.value = value;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">?</div>
        <div class="card-face card-back">${value}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped")) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moveCount++;
    moveCountEl.textContent = moveCount;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.value === card2.dataset.value;

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === cardValues.length) {
      messageEl.textContent = `🎉 Bạn đã thắng sau ${moveCount} moves!`;
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

resetBtn.addEventListener("click", createCards);

createCards();