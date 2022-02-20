const diffSelect = document.querySelector('select');
const rulesBox = document.querySelector('.rules-overlay');
const uiScore = document.querySelector('.score');
const uiWord = document.querySelector('.word');
const wordInput = document.querySelector('.word-input');
const gameCard = document.querySelector('.game-card');
const uiTime = document.querySelector('.time-left');
const gameBtn = document.querySelector('.game-btn');
const scoresBox = document.querySelector('.scores-overlay');


document.getElementById('close-rules').addEventListener('click', () => {
  rulesBox.classList.remove('show');
});

document.getElementById('close-scores').addEventListener('click', () => {
  scoresBox.classList.remove('show');
});
let timeLeft = 25;
let totalScore = 0;
let randomWords = [];
let curWord = '  ';


// Fetch all words and put into an array
async function getWords() {
  let ranWords;
  if (diffSelect.value === 'hard') {
    ranWords = 800;
  } else if (diffSelect.value === 'medium') {
    ranWords = 400;
  } else {
    ranWords = 200;
  }

  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${ranWords}`
  );
  const data = await res.json();
  randomWords = data;
  getRandomWord();
}

function getRandomWord() {
  const index = Math.floor(Math.random() * randomWords.length);
  if (index === randomWords.length) {
    getRandomWord();
  }

  curWord = randomWords[index];
  populateUI(curWord, timeLeft, totalScore);
}

document.querySelector('.navbar-toggle').addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('show');
  document.querySelector('.navbar-toggle i').classList.toggle('fa-chevron-up');
  document
    .querySelector('.navbar-toggle i')
    .classList.toggle('fa-chevron-down');
});

function startGame(e) {
  if (e.target.textContent === 'Start Game') {
    timeLeft = 25;
    gameBtn.textContent = 'Restart Game';
    
    wordInput.value = '';
    wordInput.disabled = false;

    timeInterval = setInterval(timeDecrement, 800);
  } else {
    window.location.reload();
  }
}

function timeDecrement() {
  timeLeft--;
  if (timeLeft > 0) {
    populateUI(curWord, timeLeft, totalScore);
  } else {
    clearInterval(timeInterval);
    changeState();
  }
}


function checkWord() {
  if (
    wordInput.value.toLowerCase() === curWord.toLowerCase() &&
    wordInput.value !== ''
  ) {
    totalScore++;
    updateTime();
    getRandomWord();
    wordInput.value = '';
  }
}


function changeState() {
  gameCard.innerHTML = `
    <h2>TIME RAN OUT!!!</h2>
    <p class="game-over">Your total score is ${totalScore}
    <br />
    We hope you enjoyed our game</p>
    <button class="btn play-again-btn">Play Again</button>
  `;
}

function updateTime() {
  if (diffSelect.value === 'easy') {
    timeLeft += 3;
  } else if (diffSelect.value === 'medium') {
    timeLeft += 2;
  } else {
    timeLeft++;
  }
}

function populateUI(curWord, timeLeft, totalScore) {
  uiWord.innerText = curWord;
  uiTime.innerText = `Time Left: ${timeLeft}s`;
  uiScore.innerText = `Score: ${totalScore}`;
}

function playAgain(e) {
  if (e.target.classList.contains('play-again-btn')) {
    window.location.reload();
  }
}

getWords();




gameBtn.addEventListener('click', startGame);
diffSelect.addEventListener('change', updateDifficulty);
wordInput.addEventListener('input', checkWord);
gameCard.addEventListener('click', playAgain);
  
alert('hi');
