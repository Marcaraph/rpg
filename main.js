import { Game } from './game.js'

// Create Game

const game = new Game();

document.getElementById("actionForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const action = document.getElementById("action").value;
  game.handleUserAction(action);
  document.getElementById("output").innerText = "Action effectuée : " + action;
});

game.startGame();