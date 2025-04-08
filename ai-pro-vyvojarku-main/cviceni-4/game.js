import {
  createGameState,
  createPipe,
  updateBird,
  checkCollision,
} from './gameLogic.js'

// Inicializace herního plátna a kontextu
const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('score')
const gameOverDiv = document.getElementById('game-over')

// Nastavení parametrů trubek
const pipeGap = 150
const pipeWidth = 50
const pipeSpacing = 200

let gameState
let gameLoop
let gameStarted = false

// Přidání posluchačů událostí pro skok a restart hry
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameStarted) {
      startGame()
      gameStarted = true
    } else {
      jump()
    }
  }
})

document.addEventListener('click', () => {
  if (!gameStarted) {
    startGame()
    gameStarted = true
  } else {
    jump()
  }
})

document.getElementById('restart-button').addEventListener('click', () => {
  startGame()
  gameStarted = true
})

// Funkce pro skok ptáka
function jump() {
  if (gameState.isGameOver) return
  gameState.bird.velocity = gameState.bird.jump
}

// Funkce pro aktualizaci hry
function updateGame() {
  gameState.bird = updateBird(gameState.bird)

  // Vytvoření nové trubky, pokud je potřeba
  if (
    gameState.pipes.length === 0 ||
    gameState.pipes[gameState.pipes.length - 1].x < canvas.width - pipeSpacing
  ) {
    gameState.pipes.push(createPipe(canvas.width, canvas.height, pipeGap))
  }

  // Aktualizace pozice trubek a kontrola kolizí
  gameState.pipes.forEach((pipe) => {
    pipe.x -= 2

    if (!pipe.passed && pipe.x + pipeWidth < gameState.bird.x) {
      gameState.score += 2
      scoreElement.textContent = `Score: ${gameState.score}`
      pipe.passed = true
    }

    if (checkCollision(gameState.bird, pipe, pipeWidth)) {
      gameOver()
    }
  })

  gameState.pipes = gameState.pipes.filter((pipe) => pipe.x > -pipeWidth)

  // Kontrola, zda pták nespadl na zem
  if (gameState.bird.y + gameState.bird.size > canvas.height) {
    gameOver()
  }

  draw()
}

// Funkce pro vykreslení hry
function draw() {
  ctx.fillStyle = 'skyblue'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'red' // Change bird color to red
  ctx.beginPath()
  ctx.arc(
    gameState.bird.x,
    gameState.bird.y,
    gameState.bird.size,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  ctx.fillStyle = 'green'
  gameState.pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight)
    ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY)
  })
}

// Funkce pro ukončení hry
function gameOver() {
  gameState.isGameOver = true
  gameOverDiv.style.display = 'block'
  document.getElementById('final-score').textContent = gameState.score
  cancelAnimationFrame(gameLoop)
  gameStarted = false
}

// Funkce pro spuštění hry
function startGame() {
  gameState = createGameState(canvas.width, canvas.height)
  gameOverDiv.style.display = 'none'
  scoreElement.textContent = 'Score: 0'

  gameLoop = requestAnimationFrame(function update() {
    updateGame()
    if (!gameState.isGameOver) {
      requestAnimationFrame(update)
    }
  })
}

startGame()
