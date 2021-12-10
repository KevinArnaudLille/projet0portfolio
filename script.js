// GLOBAL FUNCTIONS
function $(selector) {
  return document.querySelector(selector)
}

// SEASONS SWAP BUTTONS MAIN SETTINGS -----------------------------------
// Season object constructeur declaration

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
let snowflakesNb = 10;

// Create and add a snowflake
let snowflake = document.createElement("div");
snowflake.setAttribute("class", "snowflake");
snowflake.setAttribute("id", "snowflakeA");
$("#jsAnimatedElements").append(snowflake);
let mouseClickOnSnowflake = false;
snowflake.addEventListener('click', () => {
  mouseClickOnSnowflake = !mouseClickOnSnowflake
});
let mouseIsOnSnowflake = false;
snowflake.addEventListener('mouseover', () => {
  mouseIsOnSnowflake = !mouseIsOnSnowflake
});

let yPos = -10;
let snowflakeSpeed = 0.15;
let brownianFactor = 0.3;
let xStartingPos = 200;
let xMaxBrownianShift = 15;
let xMaxMouseoverShift = 18;
let dodgeFactor = 20;
let xShift = 0;
let snowflakeReverseExcitement = 8;

function snowflakeMove() {
  snowflake.style.cssText = `
    width: 30px;
    height: 30px;
    left: ${xStartingPos + xShift}px;
    top:${yPos * snowflakeSpeed}vh;
    border-radius: 50%;
    background-color: white;
  `;

  (yPos * snowflakeSpeed) < 110 ? yPos++ : yPos = -10;

  if (Math.round(yPos) % snowflakeReverseExcitement == 0) {
    xShift += xMaxBrownianShift * brownianFactor * (Math.random() - 0.5);
  };
  if (mouseIsOnSnowflake) {
    xShift += xMaxMouseoverShift * brownianFactor * (Math.random() - 0.5);
    yPos += dodgeFactor * (Math.random() - 0.5);
    mouseIsOnSnowflake = !mouseIsOnSnowflake;
  };
  if (mouseClickOnSnowflake) {
    snowflake.remove();
    // ici une fonction qui genere un nouveau flocon
  };
}

// ANIMATION ------------------------------

function animate() {
  snowflakeMove();
  requestAnimationFrame(animate)
}
animate();

// FALL ---------------------------------

// let mouseOver = false
// function dodgeMouse(e) {
//   console.log(e);
//   mouseOver = true;
//   setTimeout(()=>mouseOver=false,1000)
// }

// let yPos = 0;
// let snowflakeSpeed = 0.3;
// function leafMove(height=50) {
//   leaf.style.cssText = `
//     width: 50px;
//     height: ${height}px;
//     top:${yPos * snowflakeSpeed}vh;
//   `;
//   (yPos * snowflakeSpeed) < 110 ? yPos++ : yPos = 0;
// }