const scoresBox = document.querySelector('.scores-overlay');
const rulesBox = document.querySelector('.rules-overlay');
const uiWord = document.querySelector('.word');
const diffSelect = document.querySelector('select');

let currentWord = '';
let randomWords = [];

async function getWords() {
  let numWords;
  if (diffSelect.value === 'easy') {
    numWords = 100;
  } else if (diffSelect.value === 'medium') {
    numWords = 500;
  } else {
    numWords = 1000;
  }

  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${numWords}`
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

  currentWord = randomWords[index];
  populateUI(currentWord);
}

document.querySelector('.word-input').addEventListener('input', (e) => {
  if (e.target.value === currentWord) {
    getWord();
  }
});

function populateUI(currentWord) {
  uiWord.innerHTML = currentWord;
}

getWords();
populateUI(currentWord);

document.getElementById('scores-btn').addEventListener('click', () => {
  scoresBox.classList.add('show');
});
document.getElementById('close-scores').addEventListener('click', () => {
  scoresBox.classList.remove('show');
});
document.getElementById('rules-btn').addEventListener('click', () => {
  rulesBox.classList.add('show');
});
document.getElementById('close-rules').addEventListener('click', () => {
  rulesBox.classList.remove('show');
});
document.querySelector('.navbar-toggle').addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('show');
  document.querySelector('.navbar-toggle i').classList.toggle('fa-chevron-up');
  document
    .querySelector('.navbar-toggle i')
    .classList.toggle('fa-chevron-down');
});
