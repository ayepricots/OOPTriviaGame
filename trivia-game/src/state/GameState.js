import { Player } from "./Player";
import questions from "../data/questions.json"; // Import questions

const GameState = {
  // Properties
  players: [],
  currentQuestionIndex: 0,
  timer: 30,
  isGameOver: false,
  
  // Initialize GameState
  initializeGame(playerNames) {
    this.players = playerNames.map((name) => new Player(name));
    this.currentQuestionIndex = 0;
    this.timer = 30;
    this.isGameOver = false;
  },

  // Get the current question
  getCurrentQuestion() {
    return questions[this.currentQuestionIndex];
  },

  // Move to the next question
  nextQuestion() {
    if (this.currentQuestionIndex < questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.timer = 30; // Reset timer
    } else {
      this.isGameOver = true;
    }
  },

  // Update player score
  updateScore(playerId, points) {
    const player = this.players.find((p) => p.id === playerId);
    if (player) {
      player.addScore(points);
    }
  },

  // Reset the game
  resetGame() {
    this.players = [];
    this.currentQuestionIndex = 0;
    this.timer = 30;
    this.isGameOver = false;
  },
};

export default GameState;
