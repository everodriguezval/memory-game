const myGame = document.getElementById("myGame");
const intro = document.getElementById("intro");
myGame.style.display = "none";

function startGame() {
  intro.style.display = "none";
  myGame.style.display = "block";
}

//Selectors
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
const gameOverContainer = document.querySelector("#gameOver-container");
const tryAgainBtn = document.querySelector("#tryAgainBtn");
const winnerContainer = document.querySelector("#winner-container");
const playAgainBtn = document.querySelector("#playAgainBtn");
gameOverContainer.style.display = "none";
winnerContainer.style.display = "none";

let playerLives = 7;
let matches = 0;

// Link text (Lives) with variable platerLives
playerLivesCount.textContent = playerLives;

// Generating the objects (cards)
const getData = () => [
  { imgSrc: "./images/kingfisher.jpg", name: "kingfisher" },
  { imgSrc: "./images/deer.jpg", name: "deer" },
  { imgSrc: "./images/moth.jpg", name: "moth" },
  { imgSrc: "./images/redfox.jpg", name: "redfox" },
  { imgSrc: "./images/redsquirrel.jpg", name: "redsquirrel" },
  { imgSrc: "./images/robin.jpg", name: "robin" },
  { imgSrc: "./images/stagbeetle.jpg", name: "stagbeetle" },
  { imgSrc: "./images/starling.jpg", name: "starling" },
  { imgSrc: "./images/kingfisher.jpg", name: "kingfisher" },
  { imgSrc: "./images/deer.jpg", name: "deer" },
  { imgSrc: "./images/moth.jpg", name: "moth" },
  { imgSrc: "./images/redfox.jpg", name: "redfox" },
  { imgSrc: "./images/redsquirrel.jpg", name: "redsquirrel" },
  { imgSrc: "./images/robin.jpg", name: "robin" },
  { imgSrc: "./images/stagbeetle.jpg", name: "stagbeetle" },
  { imgSrc: "./images/starling.jpg", name: "starling" },
];

// To randomize the objects in the array
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  // console.log(cardData);
  return cardData;
};

// randomize();

// Card generator function
const cardGenerator = () => {
  const cardData = randomize();
  // console.log(cardData);
  // Generate the HTML. Generate 16 cards
  cardData.forEach((item) => {
    // console.log(item);
    const card = document.createElement("div");
    const imageSide = document.createElement("img");
    const backSide = document.createElement("div");
    card.classList.add("card");
    imageSide.classList.add("imageSide");
    backSide.classList.add("backSide");

    // Attach the card to our section
    section.appendChild(card);
    card.appendChild(imageSide);
    card.appendChild(backSide);

    // Attach the info to the cards
    imageSide.src = item.imgSrc;
    card.setAttribute("name", item.name);

    // To rotate the cards
    card.addEventListener("click", (f) => {
      card.classList.toggle("toggleCard"); // Add toggle class
      checkCards(f);
    });
  });
};

// Card checking
const checkCards = (e) => {
  const clickedCard = e.target; // to get the information which card we are clicking on
  //   console.log(clickedCard);
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippedCards);

  // Are the cards flipped are a match?
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      matches++;
      console.log(matches);

      // loop to remove flipped class
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none"; // so the cards that match are unclickable
        // Animation when the cards match
        card.classList.add("match");
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1500); // Remove the class that styles it so the rotate again
      });
      playerLives--; //To rest a live every time it's wrong!
      playerLivesCount.textContent = playerLives;

      if (playerLives === 0) {
        gameOver();
        // restart("Game Over. Try again!");
      }
    }
  }

  if (matches === 2) {
    console.log("2 match");

    const unmatchedCard = document.querySelectorAll(
      "section > div:not(.match)"
    );
    console.log("unmatchedCard");
    console.log(unmatchedCard);

    const unmatchedCardnumbers = Object.keys(unmatchedCard);
    unmatchedCardnumbers.sort(() => Math.random() - 0.5);
    let unmatchedCardnumbers2 = unmatchedCardnumbers.slice(0, 2);
    let cardtoshuffle1 = unmatchedCardnumbers2.slice(0, 1);
    let cardtoshuffle2 = unmatchedCardnumbers2.slice(1, 2);

    console.log(cardtoshuffle1);
    console.log(cardtoshuffle2);

    let shufflename1 = unmatchedCard[cardtoshuffle1].getAttribute("name");
    let shufflename2 = unmatchedCard[cardtoshuffle2].getAttribute("name");

    console.log(shufflename1);
    console.log(shufflename2);
  }
  // randomizeUnflipped();

  // Check if won the game
  setTimeout(() => {
    if (toggleCard.length === 16) {
      winGame();
      // restart("Congrats! You won this game");
    }
  }, 1000);
};

// Restart the game
const restart = (text) => {
  gameOverContainer.style.display = "none";
  winnerContainer.style.display = "none";
  myGame.style.display = "block";
  let cardData = randomize();
  let imageSide = document.querySelectorAll(".imageSide");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none"; // Disable them here so we cannot click while the game is resetting
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard"); // Remove the style to flip them again to their original position
    cards[index].classList.remove("match"); // To remove box shadow
    cards[index].style.pointerEvents = "none"; //Disable them here so we cannot click while the game is resetting

    // Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all"; //To be able to click again
      imageSide[index].src = item.imgSrc; // Update the image on each card
      cards[index].setAttribute("name", item.name); // Update the name on each card otherwise the card checking function won't work
      section.style.pointerEvents = "none";
    }, 1000);
  });

  //Reset the player lives too
  playerLives = 7;
  playerLivesCount.textContent = playerLives;

  // This was to create an alert to use it when the player either loose or win the game
  // setTimeout(() => {
  //   window.alert(text), 100;
  // });
};

cardGenerator();

//Audio
const musicBtn = document.querySelector("#music-btn");
const audio = new Audio("naturesong.mp3");

musicBtn.addEventListener("click", playStop);

function playStop() {
  if (audio.paused) {
    audio.play();
    musicBtn.innerHTML = "Pause";
  } else {
    audio.pause();
    musicBtn.innerHTML = "Fancy some ambience?";
  }
}

//Game over pop up
tryAgainBtn.addEventListener("click", restart);

function gameOver() {
  gameOverContainer.style.display = "block";
  myGame.style.display = "none";
  if (audio.played) {
    audio.pause();
    musicBtn.innerHTML = "Fancy some ambience?";
  }
}

//Congrats pop up
playAgainBtn.addEventListener("click", restart);

function winGame() {
  winnerContainer.style.display = "block";
  myGame.style.display = "none";
  if (audio.played) {
    audio.pause();
    musicBtn.innerHTML = "Fancy some ambience?";
  }
}

//
