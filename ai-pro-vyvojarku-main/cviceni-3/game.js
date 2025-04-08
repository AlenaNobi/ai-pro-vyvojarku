const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 3, // Reduced speed
    dy: 2 // Reduced speed
};

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
let currentColorIndex = 0;

// Paddle objects
const paddleWidth = 10;
const paddleHeight = 75;
const paddleSpeed = 8;

const leftPaddle = {
    x: 0,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const rightPaddle = {
    x: canvas.width - paddleWidth,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let leftScore = 0;
let rightScore = 0;

// Draw the ball on the canvas
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = colors[currentColorIndex];
    context.fill();
    context.closePath();
}

// Draw paddles on the canvas
function drawPaddle(paddle, color) {
    context.fillStyle = color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw scores on the canvas
function drawScores() {
    context.font = '32px Arial';
    context.fillStyle = '#fff';
    context.fillText(leftScore, canvas.width / 4, 50);
    context.fillText(rightScore, (canvas.width * 3) / 4, 50);
}

// Draw the playing area
function drawPlayingArea() {
    context.fillStyle = '#87CEEB'; // Sky blue color for the playing area
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the title and motivational message
function drawTitleAndMessage() {
    context.font = '48px Arial';
    context.fillStyle = '#fff';
    context.fillText('Pong Game', canvas.width / 2 - 120, 50);

    context.font = '24px Arial';
    context.fillText('Hrajte a bavte se!', canvas.width / 2 - 100, 80);
}

// Move paddles
function movePaddle(paddle) {
    paddle.y += paddle.dy;

    // Prevent paddles from going out of bounds
    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

// Event listeners for paddle controls
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            rightPaddle.dy = -paddleSpeed;
            break;
        case 'ArrowDown':
            rightPaddle.dy = paddleSpeed;
            break;
        case 'w':
            leftPaddle.dy = -paddleSpeed;
            break;
        case 's':
            leftPaddle.dy = paddleSpeed;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            rightPaddle.dy = 0;
            break;
        case 'w':
        case 's':
            leftPaddle.dy = 0;
            break;
    }
});

// Check for game over
function checkGameOver() {
    if (leftScore >= 10 || rightScore >= 10) {
        context.font = '64px Arial';
        context.fillStyle = '#fff';
        context.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
        return true;
    }
    return false;
}

// Update ball position and paddle positions
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (left/right)
    if (ball.x + ball.radius > canvas.width) {
        leftScore++;
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        rightScore++;
        resetBall();
    }

    // Paddle collision
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && 
        ball.y > leftPaddle.y && 
        ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx = Math.abs(ball.dx); // Ensure ball moves to the right
    } else if (ball.x + ball.radius > rightPaddle.x && 
               ball.y > rightPaddle.y && 
               ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx = -Math.abs(ball.dx); // Ensure ball moves to the left
    }

    // Wall collision (top/bottom)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
}

// Reset ball to the center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// Game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayingArea(); // Draw the playing area first
    drawTitleAndMessage(); // Draw the title and message
    drawBall();
    drawPaddle(leftPaddle, '#00f'); // Blue color for left paddle
    drawPaddle(rightPaddle, '#f00'); // Red color for right paddle
    drawScores();
    update();
    if (!checkGameOver()) {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
