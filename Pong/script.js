{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const canvas = document.getElementById("gameCanvas");\
const ctx = canvas.getContext("2d");\
\
const paddleWidth = 10;\
const paddleHeight = 60;\
let playerY = canvas.height / 2 - paddleHeight / 2;\
let computerY = canvas.height / 2 - paddleHeight / 2;\
const ballRadius = 10;\
let ballX = canvas.width / 2;\
let ballY = canvas.height / 2;\
let ballSpeedX = 5;\
let ballSpeedY = 5;\
let playerScore = 0;\
let computerScore = 0;\
\
function drawPaddle(x, y) \{\
  ctx.fillStyle = "black";\
  ctx.fillRect(x, y, paddleWidth, paddleHeight);\
\}\
\
function drawBall() \{\
  ctx.beginPath();\
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);\
  ctx.fillStyle = "black";\
  ctx.fill();\
  ctx.closePath();\
\}\
\
function update() \{\
  // Clear canvas\
  ctx.clearRect(0, 0, canvas.width, canvas.height);\
\
  // Draw paddles and ball\
  drawPaddle(0, playerY);\
  drawPaddle(canvas.width - paddleWidth, computerY);\
  drawBall();\
\
  // Ball movement\
  ballX += ballSpeedX;\
  ballY += ballSpeedY;\
\
  // Ball collisions with walls\
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) \{\
    ballSpeedY = -ballSpeedY;\
  \}\
\
  // Ball collisions with paddles\
  if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) \{\
    ballSpeedX = -ballSpeedX;\
  \}\
  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) \{\
    ballSpeedX = -ballSpeedX;\
  \}\
\
  // Computer AI (very basic)\
  computerY += (ballY - (computerY + paddleHeight / 2)) * 0.1;\
\
  // Score\
  if (ballX - ballRadius < 0)\{\
    computerScore++;\
    resetBall();\
  \}\
  if(ballX + ballRadius > canvas.width)\{\
    playerScore++;\
    resetBall();\
  \}\
\
  // Display score\
  ctx.font = "20px Arial";\
  ctx.fillText(playerScore + " - " + computerScore, canvas.width/2 - 30, 20);\
\
  // Request next frame\
  requestAnimationFrame(update);\
\}\
\
function resetBall()\{\
  ballX = canvas.width/2;\
  ballY = canvas.height/2;\
  ballSpeedX = -ballSpeedX;\
  ballSpeedY = Math.random() * 10 - 5;\
\}\
\
// Player input\
document.addEventListener("mousemove", (event) => \{\
  playerY = event.clientY - canvas.offsetTop - paddleHeight / 2;\
\});\
\
// Start the game loop\
update();}