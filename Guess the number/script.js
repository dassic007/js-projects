// document.querySelector('.message').textContent = 'You have guessed right!';

let score = 20;
let highscore = 0;

const score_text = document.querySelector('.score');
const highscore_text = document.querySelector('.highscore');
const numberDisplay = document.querySelector('.number');

const message = document.querySelector('.message');

let guess = Math.floor(Math.random() * 20) + 1;

const computation = function () {
    let number = document.querySelector('.guess').value;
    console.log(guess);

    if (number < guess) {
        if (score > 0) {
            message.textContent = `${number} is too Low!`;
            score--;
            score_text.textContent = score;
        } else {
            message.textContent = 'Sorry! You lost the game!';
        }
    } else if (number > guess) {
        if (score > 0) {
            message.textContent = `${number} is too High!`;
            score--;
            score_text.textContent = score;
        } else {
            message.textContent = 'Sorry! You lost the game!';

        }
    } else if (number == guess) {
        message.textContent = 'You have guessed the right number!!!';
        score_text.textContent = '0';
        highscore = score;
        highscore_text.textContent = highscore;
        number = '0';
        numberDisplay.textContent = guess;
        document.body.style.backgroundColor = '#60b347';
    } else if (!number) {
        message.textContent = 'No Number provided';
    }
    document.querySelector('.guess').value = '';
}

document.querySelector('.check').addEventListener('click', () => {
    computation();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        computation();
    }
});

document.querySelector('.again').addEventListener('click', () => {
    document.querySelector('.guess').value = '';
    message.textContent = 'Start guessing...';
    numberDisplay.textContent = '?';
    document.body.style.backgroundColor = '#222';
})