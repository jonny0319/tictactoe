const table = document.querySelector("#app table")
const fullBoard = document.querySelectorAll('td')
const MIN = 4
let player = 'circle'
let circlePosition = []
let crossPosition = []
let round = 1

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
  player === 'circle' ? circlePosition.push(Number(position)) : crossPosition.push(Number(position))
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
  }, 1000)
}

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  const cellPosition = event.target.dataset.index
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  player === 'circle' ? drawCircle(cell) : drawCross(cell)
  recordPosition(cellPosition)
  if (round > MIN && checkWinner()) {
    return resetBoard()
  }
  switchPlayer()
  round++

})


