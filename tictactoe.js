const table = document.querySelector("#app table")
let player = 'circle'

function drawCircle(cell) {
  cell.innerHTML = "<div class='circle' />"
}

function drawCross(cell) {
  cell.innerHTML = "<div class='cross' />"
}

table.addEventListener("click", function onTableClicked(event) {
  const cell = event.target
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  if (player === 'circle') {
    drawCircle(cell)
    player = 'cross'
  } else {
    drawCross(cell)
    player = 'circle'
  }
})