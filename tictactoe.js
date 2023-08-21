const table = document.querySelector("#app table")
const fullBoard = document.querySelectorAll('td')
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
  setTimeout(() => {
    fullBoard.forEach(element => element.innerHTML = '')
    circlePosition = []
    crossPosition = []
    round = 1
    player = 'circle'
    emptyPosition = Array.from(Array(10).keys())
    emptyPosition.shift()
  }, 1000)
}

function isMatchWinnable() {
  return round >= MIN
}

function showGameEnded() {
  const div = document.createElement('div')
  div.classList.add('completed')
  const playerCap = player.charAt(0).toUpperCase() + player.slice(1)
  div.innerHTML = `
  <p>${playerCap} Wins!</p>
  `
  const header = document.querySelector('#header')
  header.append(div)
}

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  const cellPosition = Number(event.target.dataset.index)
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  player === 'circle' ? drawCircle(cell) : drawCross(cell)
  recordPosition(cellPosition)
  if (isMatchWinnable() && checkWinner()) {
    showGameEnded()
    return resetBoard()
  }
  switchPlayer()
  round++

})


