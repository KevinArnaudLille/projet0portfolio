// SEASONS SWAP BUTTONS MAIN SETTINGS -----------------------------------
// Season object constructeur declaration
function $(selector){
  return document.querySelector(selector)
}

function Season(id) {
  this.seasonId = id,
    this.seasonBtn = $(`#${id}`),
    this.styleSheetCall = $(`#${id}`).addEventListener('click', () => switchSeasonPageStyle(id)),
    this.mouseOverBtn = $(`#${id}`).addEventListener('mouseover', () => seasonBtnMouseOver(id)),
    this.mouseLeaveBtn = $(`#${id}`).addEventListener('mouseout', () => seasonBtnMouseOut(id))
};

function seasonBtnMouseOver(id) {
  let season = seasons.find(obj => { return obj.seasonId === id });
  season.seasonBtn.style.backgroundColor = "red";
};

function seasonBtnMouseOut(id) {
  let season = seasons.find(obj => { return obj.seasonId === id });
  season.seasonBtn.style.backgroundColor = "white";
};

function switchSeasonPageStyle(id) {
  console.log(id)
  $("#styleSheet").setAttribute("href", `${id}Style.css`);
};

// Seasons objects list generation
let seasons = []
for (item of ["fall", "winter", "spring", "summer"]) {
  seasons.push(
    new Season(item)
  );
};

// WINTER -------------------------------



// FALL ---------------------------------



// let leaf = document.createElement("div");
// leaf.setAttribute("class", "leaves");
// leaf.setAttribute("id", "leafA");
// leaf.style.cssText = `
// width: 50px;
// height: 50px;
// `;
// document.querySelector("#jsAnimatedElements").append(leaf);
// leaf.addEventListener('mouseover', (e) => dodgeMouse(e))

// let mouseOver = false
// function dodgeMouse(e) {
//   console.log(e);
//   mouseOver = true;
//   setTimeout(()=>mouseOver=false,1000)
// }

// let i = 0;
// let speed = 0.3;
// function leafMove(height=50) {
//   leaf.style.cssText = `
//     width: 50px;
//     height: ${height}px;
//     top:${i * speed}vh;
//   `;
//   (i * speed) < 110 ? i++ : i = 0;
// }

// Animation

// function animate() {
//   leafMove()
//   if (mouseOver){
//     leafMove(70)
//   }
//   requestAnimationFrame(animate)
// }
// animate();