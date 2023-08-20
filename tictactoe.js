const table = document.querySelector("#app table")
let player = 'circle'
let circlePosition = []
let crossPosition = []

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
  console.log('position is ', position)
  player === 'circle' ? circlePosition.push(position) : crossPosition.push(position)
}

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  const cellPosition = event.target.dataset.index
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  player === 'circle' ? drawCircle(cell) : drawCross(cell)
  recordPosition(cellPosition)
  switchPlayer()

})