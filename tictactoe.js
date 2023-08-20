const table = document.querySelector("#app table")
let player = 'circle'

function drawCircle(cell) {
  cell.innerHTML = "<div class='circle' />"
}

function drawCross(cell) {
  cell.innerHTML = "<div class='cross' />"
}

function switchPlayer() {
  player = player === 'circle' ? 'cross' : 'circle'
}

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  player === 'circle' ? drawCircle(cell) : drawCross(cell)
  switchPlayer()

})