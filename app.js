/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// assigning variables 
let score, activePlayer, roundScore, gamePlaying, previousThrow1, previousThrow2, winningScore, input;

function hide (){
document.getElementById("dice-1").style.display = "none";
document.getElementById("dice-2").style.display = "none";
} 

function reveal (){
   document.getElementById("dice-1").style.display = "block";
   document.getElementById("dice-2").style.display = "block";
   } 

newButtonFunction ();
// all the functions that I'm going to use
function newButtonFunction () {
   score =  [0,0];
   activePlayer = 0;
   roundScore = 0;
   document.getElementById ("score-0").textContent = 0; 
   document.getElementById ("score-1").textContent = 0;
   document.getElementById ("current-0").textContent = 0;
   document.getElementById ("current-1").textContent = 0;
   document.getElementById ("name-0").textContent = "Player 1";
   document.getElementById ("name-1").textContent = "Player 2";
   document.querySelector(".player-0-panel").classList.remove("active");
   document.querySelector(".player-1-panel").classList.remove("active");
   document.querySelector(".player-0-panel").classList.remove("winner");
   document.querySelector(".player-1-panel").classList.remove("winner");
   document.querySelector(".player-0-panel").classList.add("active");
   hide ();
   document.querySelector(".btn-roll").style.display = "block";
   document.querySelector(".btn-hold").style.display = "block";
   gamePlaying = true;
   previousThrow = 0;
  // winningScore =  prompt ("Enter the score limit !");
   }
   // Next player function
function nextPlayer () {
      roundScore = 0;
      document.getElementById("current-" + activePlayer).textContent = 0;
      document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active"); // changing active panel
      activePlayer === 1 ? ( activePlayer -= 1 ) : (activePlayer += 1) ;   
      document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
   }
// Setting up everything to Zero and hiding the dice
newButtonFunction ();
// Roll Dice button
document.querySelector(".btn-roll").addEventListener("click", rolldiceFunction )
function rolldiceFunction () {

   if (gamePlaying) {
reveal ();
// First Dice:
// Random function 
   let dice1 = Math.floor((Math.random() * 6 ) + 1 );
   let diceImage1 = document.getElementById("dice-1")
// dice image mapping 
   diceImage1.src = "dice-" + dice1 + ".png";
// Second Dice:
let dice2 = Math.floor((Math.random() * 6 ) + 1 );
let diceImage2 = document.getElementById("dice-2")
// dice image mapping 
diceImage2.src = "dice-" + dice2 + ".png";

console.log (dice1, dice2);

// dice result is 1 restting the round score and switching to another player
if (dice1 === 1 ||dice2 === 1)  { 
   nextPlayer ();
} 

else {
   if ((dice1 === previousThrow1 && dice1 === 6) || (dice2 === previousThrow2 && dice2 === 6)) {
      document.querySelector("#score-" + activePlayer).textContent = 0;
      score[activePlayer] = 0;
      nextPlayer (); }
      else {
// Changing Next Player and not changing the dice image, to make the user understand why we have changed it.
previousThrow1 = dice1;
previousThrow2 = dice2;
roundScore += (dice1 + dice2); 
document.querySelector("#current-" + activePlayer).textContent = roundScore;
      }
}
}
}
// Hold button function
document.querySelector(".btn-hold").addEventListener ("click", holdFunction )
function holdFunction () {

if (gamePlaying) {
score[activePlayer] += roundScore;
document.querySelector ("#score-" + activePlayer).textContent =  score[activePlayer];
input = document.getElementById("winscr").value;
if (input) {
   winningScore = input;
}
else {winningScore = 50; }
// To display the name of the winner if the players score reach 100 
if (score[activePlayer] >= winningScore ) { 
gamePlaying = false;
document.querySelector("#name-" + activePlayer).textContent = "Winner!";
hide();
document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("winner");
}
/* // use this if you want to be mean!
if (score[activePlayer] >= 100 && activePlayer === 0) {(document.querySelector("#name-0").textContent = "Winner!") && (document.querySelector("#name-1").textContent = "Loser!");}
else if (score[activePlayer] >= 100 && activePlayer === 1) {(document.querySelector("#name-1").textContent = "Winner!") && (document.querySelector("#name-0").textContent = "Loser!");}
*/
else {
// To add the round score to the score array
hide ();
// resetting the dice image only if it is a hold
 nextPlayer ();
}
}
}
// To reset the game at anytime when the new button is pressed
document.querySelector(".btn-new").addEventListener ("click", newButtonFunction )