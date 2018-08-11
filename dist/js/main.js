// Globals

let currentLevel;
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const easyDifficulty = document.querySelector('[data-difficulty="easy"]');
const mediumDifficulty = document.querySelector('[data-difficulty="medium"]');
const hardDifficulty = document.querySelector('[data-difficulty="hard"]');
const startButton = document.querySelector('[data-start]');
const repeatButton = document.querySelector('[data-repeat]');
const playerName = document.querySelector('[data-name]');
const playerNameSubmit = document.querySelector('[data-name-submit]');
const playerNameForm = document.querySelector('[data-form]');

function getName(e) {
  e.preventDefault();
  if (playerName.value === '') {
    playerName.value = 'Unknown player';
  }
  this.parentNode.style.display = 'none';
  easyDifficulty.parentNode.style.display = 'block';
}

playerNameSubmit.addEventListener('click', getName);

// hide start and repeat button on load
easyDifficulty.parentNode.style.display = 'none';
startButton.style.display = 'none';
repeatButton.style.display = 'none';

// listen for click
easyDifficulty.addEventListener('click', changeLevel);
mediumDifficulty.addEventListener('click', changeLevel);
hardDifficulty.addEventListener('click', changeLevel);

startButton.addEventListener('click', init);
repeatButton.addEventListener('click', reload);

function changeLevel() {
  difficulty = this.dataset.difficulty;
  if (difficulty === 'easy') {
    currentLevel = 5;
  } else if (difficulty === 'medium') {
    currentLevel = 3;
  } else {
    currentLevel = 1;
  }
  // hide difficult selection button group and show start button
  return (
    (this.parentNode.style.display = 'none') &&
    (startButton.style.display = 'inline')
  );
}

// refresh browser
function reload() {
  location.reload();
}

// disable input
wordInput.disabled = true;

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];
let checkStatusInterval;

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  checkStatusInterval = setInterval(checkStatus, 50);
  // enable input
  wordInput.disabled = false;
  // `this` in this context is `startButton`
  this.style.display = 'none';
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
    repeatButton.style.display = 'inline';
    // disable input
    wordInput.disabled = true;
    clearInterval(checkStatusInterval);
  }
}
