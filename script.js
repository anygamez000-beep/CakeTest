// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
};

let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameSpeed = 100;

// Display high score
document.getElementById('highScore').textContent = highScore;

// Event listeners
document.addEventListener('keydown', handleKeyPress);
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Handle arrow key presses
function handleKeyPress(event) {
    const key = event.key;
    
    if (key === 'ArrowUp' && direction.y === 0) {
        nextDirection = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        nextDirection = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        nextDirection = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        nextDirection = { x: 1, y: 0 };
    }
}

// Start game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        document.getElementById('startBtn').textContent = 'Pause';
        gameLoop();
    } else {
        gameRunning = false;
        document.getElementById('startBtn').textContent = 'Resume';
    }
}

// Reset game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameRunning = false;
    document.getElementById('score').textContent = score;
    document.getElementById('startBtn').textContent = 'Start Game';
    generateFood();
    draw();
}

// Generate food at random location
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

// Main game loop
function gameLoop() {
    if (!gameRunning) return;
    
    // Update snake direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
    };
    
    // Check wall collision
    if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
        endGame();
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        endGame();
        return;
    }
    
    // Add new head
    snake.unshift(newHead);
    
    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    draw();
    setTimeout(gameLoop, gameSpeed);
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#00FF00';
    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });
    
    // Draw food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

// End game
function endGame() {
    gameRunning = false;
    document.getElementById('startBtn').textContent = 'Start Game';
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
        alert(`Game Over! New High Score: ${score}!`);
    } else {
        alert(`Game Over! Score: ${score}`);
    }
}

// Initial draw
draw();
