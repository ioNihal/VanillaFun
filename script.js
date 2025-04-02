
const gameContainer = document.getElementById('gameContainer');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');


let ballX = 50, ballY = 50;
let ballDX = 2, ballDY = 3;
let paddleX = 150;
const paddleSpeed = 30;


function updateGame() {
  
  ballX += ballDX;
  ballY += ballDY;

  // Bounce off left/right walls
  if (ballX <= 0 || ballX + ball.offsetWidth >= gameContainer.offsetWidth) {
    ballDX = -ballDX;
  }
  // Bounce off the top
  if (ballY <= 0) {
    ballDY = -ballDY;
  }

 
  const paddleTop = paddle.offsetTop;
  // Check for collision with paddle
  if (
    ballY + ball.offsetHeight >= paddleTop &&
    ballX + ball.offsetWidth >= paddleX &&
    ballX <= paddleX + paddle.offsetWidth
  ) {
    ballDY = -ballDY;
    ballY = paddleTop - ball.offsetHeight; 
  }

  // Game Over if the ball falls below the paddle
  if (ballY > gameContainer.offsetHeight) {
    alert("Game Over!");
    ballX = 50;
    ballY = 50;
    ballDX = 2;
    ballDY = 3;
  }

  
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  paddle.style.left = paddleX + "px";

  requestAnimationFrame(updateGame);
}
updateGame();


function movePaddle(direction) {
  if (direction === 'left') {
    paddleX = Math.max(0, paddleX - paddleSpeed);
  } else if (direction === 'right') {
    paddleX = Math.min(
      gameContainer.offsetWidth - paddle.offsetWidth,
      paddleX + paddleSpeed
    );
  }
}
