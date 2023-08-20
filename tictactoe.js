const table = document.querySelector("#app table")

function draw(cell) {
  cell.innerHTML = "<div class='circle' />"
}

table.addEventListener("click", function onTableClicked(event) {
  console.log(event.target)
  if (event.target.tagName !== "TD") {
    return; // early return 
  }

  draw(event.target)
})