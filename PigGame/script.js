const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Starting Conditions

let scores;
let currentScore, activePlayer, isPlaying;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
    player0.classList.add('player--active');

};

init();

// Roll Dice functionality
btnRoll.addEventListener('click', () => {
    if (isPlaying) {
        // 1. Calculate a random dice number
        const diceNum = Math.floor(Math.random() * 6) + 1;

        // 2. Display the appropriate dice image
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNum}.png`;

        // 3. Check dice number for 1: if true, switch to next player
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (isPlaying) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        if (activePlayer === 0) {
            score0.textContent = scores[activePlayer];
        } else {
            score1.textContent = scores[activePlayer];
        }

        // 2. Check if active player's score >=100
        if (scores[activePlayer] >= 100) {
            // Active player Wins
            isPlaying = false;

            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER !'

        } else {
            // Switch player
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init);



const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

