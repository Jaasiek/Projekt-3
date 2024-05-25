const cards = [
  { id: 1, src: "/assets/adrian.webp", class: "front" },
  { id: 2, src: "/assets/darek.webp", class: "front" },
  { id: 3, src: "/assets/klaudia.webp", class: "front" },
  { id: 4, src: "/assets/mati.webp", class: "front" },
  { id: 5, src: "/assets/paniMarzenka.webp", class: "front" },
  { id: 6, src: "/assets/panJacek.webp", class: "front" },
  { id: 7, src: "/assets/panMaciek.webp", class: "front" },
  { id: 8, src: "/assets/tomek.webp", class: "front" },
  { id: 9, src: "/assets/adrian.webp", class: "front" },
  { id: 10, src: "/assets/darek.webp", class: "front" },
  { id: 11, src: "/assets/klaudia.webp", class: "front" },
  { id: 12, src: "/assets/mati.webp", class: "front" },
  { id: 13, src: "/assets/paniMarzenka.webp", class: "front" },
  { id: 14, src: "/assets/panJacek.webp", class: "front" },
  { id: 15, src: "/assets/panMaciek.webp", class: "front" },
  { id: 16, src: "/assets/tomek.webp", class: "front" },
];

const board_game = document.querySelector("#board_game");
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function genCards() {
  win = 0;
  shuffle(cards);
  restart();
  for (let card of cards) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.dataset.id = card.id;
    cardEl.dataset.src = card.src;
    cardEl.innerHTML = `
        <div class="front">
          <img class="close-card " src="${card.src}" />
        </div>
        <div class="back"></div>
      `;
    board_game.appendChild(cardEl);
    cardEl.addEventListener("click", cardFlip);
  }
}
genCards();

function cardFlip(event) {
  console.log(flippedCards.length);
  const clickedCard = event.currentTarget;

  if (clickedCard.classList.contains("flipped") || flippedCards.length === 2) {
    return;
  }
  clickedCard.classList.add("flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    const flippedCard1 = flippedCards[0].dataset.src;
    const flippedCard2 = flippedCards[1].dataset.src;

    if (flippedCard1 === flippedCard2) {
      const message = document.querySelector("#alert");
      message.style.display = "flex";
      message.style.animation = "none";
      matchedPairs++;
      message.innerHTML = "Połączone pary  " + `<p>${matchedPairs}</p>`;
      console.log(flippedCards);

      if (matchedPairs === cards.length / 2) {
        const alert = document.querySelector("#alert");
        alert.style.display = "flex";
        alert.style.animation = "1s pulse infinite";
        alert.innerHTML = "Wygrana!";
      }
    } else {
      console.log(flippedCards[0].classList);
      console.log(flippedCards[1].classList);
      setTimeout(() => {
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
      }, 2000);
    }

    flippedCards = [];
  }
}

function restart() {
  const button = document.querySelector("button");
  const alert = document.querySelector("#alert");
  alert.innerHTML = "";
  board_game.innerHTML = "";
  button.addEventListener("click", genCards);
  flippedCards = [];
  matchedPairs = 0;
}
