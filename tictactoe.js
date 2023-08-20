const table = document.querySelector("#app table")

function drawCircle(cell) {
  cell.innerHTML = "<div class='circle' />"
}

function drawCross(cell) {
  cell.innerHTML = "<div class='cross' />"
}

table.addEventListener("click", function onTableClicked(event) {
  console.log(event.target)
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  drawSquare(event.target)
})