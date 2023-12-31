const table = document.querySelector("#app table")
const fullBoard = document.querySelectorAll('td')
const header = document.querySelector('#header')
const statusBoard = document.querySelector('#status-board')

// minimum rounds to win
const MIN = 5
let player = 'circle'
let circlePosition = []
let crossPosition = []
let round = 1

// create array of [1,2,3,4,5,6,7,8,9]
let emptyPosition = Array.from(Array(10).keys())
emptyPosition.shift()

const victoryLine = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

function drawCircle(cell) {
  cell.innerHTML = "<div class='circle' />"
}

function drawCross(cell) {
  cell.innerHTML = "<div class='cross' />"
}

function switchPlayer() {
  player = player === 'circle' ? 'cross' : 'circle'
}

function recordPosition(position) {
  // console.log('position is ', position)
  player === 'circle' ? circlePosition.push(position) : crossPosition.push(position)
  spotTaken = emptyPosition.findIndex(element => element === position)
  emptyPosition.splice(spotTaken, 1)
  // console.log(emptyPosition)
}

function checkWinner() {
  if (player === 'circle') {
    for (let i = 0; i < victoryLine.length; i++) {
      if (victoryLine[i].every(element => circlePosition.includes(element))) {
        console.log(`${player} wins`)
        return true;
      }
    }
  } else {
    for (let i = 0; i < victoryLine.length; i++) {
      if (victoryLine[i].every(element => crossPosition.includes(element))) {
        console.log(`${player} wins`)
        return true;
      }
    }
  }
  return false;
}

function resetBoard() {
  const endGameDisplay = document.querySelector('.completed')
  setTimeout(() => {
    fullBoard.forEach(element => element.innerHTML = '')
    circlePosition = []
    crossPosition = []
    round = 1
    player = 'circle'
    emptyPosition = Array.from(Array(10).keys())
    emptyPosition.shift()
    endGameDisplay.remove()
    showGameStatus()
    header.dataset.display = 'off'
  }, 3000)
}

function isMatchWinnable() {
  return round >= MIN
}

function showGameEnded() {
  // break out of function if end game display is already on
  if (header.dataset.display === 'on') {
    return
  }
  // Capitalized the first letter of player
  const playerCap = player.charAt(0).toUpperCase() + player.slice(1)
  const div = document.createElement('div')
  div.classList.add('completed')
  div.innerHTML = `  
  <p>${playerCap} Wins!</p>
  `

  header.append(div)
  header.dataset.display = 'on'
}

function showGameTie() {
  const div = document.createElement('div')
  div.classList.add('completed')
  div.innerHTML = `  
  <p>Tie!</p>
  `

  header.append(div)
}

function showGameStatus() {
  const playerCap = player.charAt(0).toUpperCase() + player.slice(1)
  statusBoard.innerHTML = `
  <p>Current Player: ${playerCap}</p>
  <p>Round: ${round}</p>
  `
}

// if no more empty spot to play when nobody wins, it is a tie
function isMatchTie() {
  return emptyPosition.length === 0
}

showGameStatus()

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  const cellPosition = Number(event.target.dataset.index)

  // do nothing if pressed item is not a cell or if end game message is displayed
  if (event.target.tagName !== "TD" || header.dataset.display === 'on') {
    return; // early return 
  }
  showGameStatus()

  player === 'circle' ? drawCircle(cell) : drawCross(cell)
  recordPosition(cellPosition)

  if (isMatchWinnable() && checkWinner()) {
    showGameEnded()
    return resetBoard()
  } else if (isMatchTie()) {
    showGameTie()
    return resetBoard()
  }

  switchPlayer()
  round++
})


