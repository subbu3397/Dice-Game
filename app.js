var winningScore, player1, player2, dice1, dice2, currentScore = 0, dice1random = 0, dice2random = 0, score = [0, 0], flag = 0;
newGame();

//Setting all the scores to zero at the start of the game
function initial() {
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    score= [0,0];
    currentScore=0;
}

//toggle animation
function toggle() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
function switching() {
    var counter = 0;
    //disabling buttons while switching between the players
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    //actual toggle (recursive fn)
    (function tog() {
        setTimeout(function () {
            if (counter++ < 10) {
                toggle();
                tog();
            }
            if (counter == 9) {
                setTimeout(function () {
                    //enabling the buttons
                    document.querySelector('.btn-roll').style.display = 'block';
                    document.querySelector('.btn-hold').style.display = 'block';
                }, 550);
            }
        }, 450);
    })();
}
//Deciding active player by random Number 
var activePlayer = Math.floor(Math.random() * 2);
if (activePlayer == 0)
    toggle();
document.querySelector('.btn-new').addEventListener("click", function () {
    newGame();
});

//Setting up the game at the start by assinging default players name
function newGame() {
    winningScore = prompt("Please enter the winning score");
    player1 = prompt("Player1 Name");
    player2 = prompt("Player2 Name");
    document.getElementById("name-0").textContent = player1;
    document.getElementById("name-1").textContent = player2;
    if (document.getElementById("name-0").textContent == "") {
        document.getElementById("name-0").textContent = "Player1";
    }
    if (document.getElementById("name-1").textContent == "") {
        document.getElementById("name-1").textContent = "Player2";
    }
    initial();
    toggle();
    switching();
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;

}
dice1 = document.querySelector('.dice1');
dice2 = document.querySelector('.dice2');
//Event Listener for roll dice
document.querySelector('.btn-roll').addEventListener("click", function () {
    rotateDice();
    scoreUpdates();

});
//Event Listener for Hold Dice
document.querySelector('.btn-hold').addEventListener("click", function () {
    toggle();
    scoreUpdatesAfterHold();
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

});

//Fetching random number and displaying dice according to it with special conditions
function rotateDice() {
    flag = 1;
    dice1random = Math.floor(Math.random() * 4) + 1;
    dice2random = Math.floor(Math.random() * 4) + 1;
    dice1.src = "dice-" + dice1random + ".png";
    dice2.src = "dice-" + dice2random + ".png";
    if (dice1random == 6 && dice2random == 6) {
        flag = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        currentScore = 0;
        document.getElementById('current-' + activePlayer).textContent = currentScore;
        toggle();
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
    else if (dice1random == 1 || dice2random == 1) {
        flag = 0;
       currentScore = 0;
       document.getElementById('current-' + activePlayer).textContent = currentScore;
        toggle();
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
}

//Setting the winner by checking with winning score
function win() {
    score[activePlayer] += currentScore
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    currentScore = 0;
    document.getElementById('current-' + activePlayer).textContent = currentScore;
    document.getElementById("name-" + activePlayer).textContent = "Winner";
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;

}

//Updating the score for every roll and checking the winner
function scoreUpdates() {
    if (flag == 1) {
        currentScore += dice1random + dice2random;
        if ((score[activePlayer] + currentScore) >= winningScore) {
            win();
        }
        console.log(activePlayer);
        document.getElementById('current-' + activePlayer).textContent = currentScore;
    }
}

//updating the score after holding the dice
function scoreUpdatesAfterHold() {
    score[activePlayer] += currentScore
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    currentScore = 0;
    document.getElementById('current-' + activePlayer).textContent = currentScore;
}




