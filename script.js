// GLOBAL FUNCTIONS
function $(selector) {
  return document.querySelector(selector)
}

let GLOBALHOnWRate = window.innerHeight / window.innerWidth;
console.log(GLOBALHOnWRate);

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
let initSnowflakesNb = 100;
let currentSnowflakes = [];

function Snowflake(num, lane) {
  console.log("snowflake generated")
  console.log(lane);

  this.docElement = document.createElement("div");
  this.docElement.setAttribute("class", "snowflakes");
  this.docElement.setAttribute("id", `snowflake${num}`);
  $("#jsAnimatedElements").append(this.docElement);
  this.mouseClickOnSnowflake = false;

  this.docElement.addEventListener('click', () => {
    this.mouseClickOnSnowflake = true;
  });
  this.mouseIsOnSnowflake = false;
  this.docElement.addEventListener('mouseover', () => {
    this.mouseIsOnSnowflake = !this.mouseIsOnSnowflake
  });


  this.xStartingPos = 100 * Math.random();
  this.yStartingPos = (-1000 * Math.random()) - 10;
  this.snowflakeSpeed = 0.03 + (0.08 * Math.random());
  this.snowflakeWidth = 1 +(2* Math.random());
  this.snowflakeHeight = this.snowflakeWidth / GLOBALHOnWRate;
  this.backGroundColor = "white";


  let xMaxBrownianShift = 0.3;
  let xMaxMouseoverShift = 1;
  let dodgeFactor = -20;
  let xShift = 0;
  let snowflakeReverseExcitement = 3;
  let windForce = 0.002;
  let windDirection = 1;

  this.snowflakeMove = () => {
    (this.yStartingPos * this.snowflakeSpeed) < 110 ? this.yStartingPos++ : this.yStartingPos = -10;
    xShift += (windForce * windDirection)

    if (Math.round(this.yStartingPos) % snowflakeReverseExcitement == 0) {
      xShift += xMaxBrownianShift * (Math.random() - 0.5);
    };

    if (this.mouseIsOnSnowflake) {
      xShift += xMaxMouseoverShift * (Math.random() - 0.5);
      this.yStartingPos += dodgeFactor * (Math.random());
      this.backGroundColor = "red";
      setTimeout(()=>this.backGroundColor = "white",1000);
      this.mouseIsOnSnowflake = !this.mouseIsOnSnowflake;
    };

    if (this.mouseClickOnSnowflake) {
      this.docElement.remove();
      addSnowflake()
      this.mouseClickOnSnowflake = false;
    };

    this.docElement.style.cssText = `
    width: ${this.snowflakeWidth}vw;
    height: ${this.snowflakeHeight}vh;
    left: ${this.xStartingPos + xShift}vw;
    top:${this.yStartingPos * this.snowflakeSpeed}vh;
    border-radius: 50%;
    background-color: ${this.backGroundColor};
  `;
  }
}

// lane => front, middle, back
for (i = 0; i < initSnowflakesNb; i++) {
  currentSnowflakes.push(new Snowflake(i, "back"));
}

function addSnowflake() {
  currentSnowflakes.push(new Snowflake((currentSnowflakes.length + 1), "back"));
}


// ANIMATION ------------------------------

function animate() {
  for (sf of currentSnowflakes) {
    sf.snowflakeMove();
  }
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

// ARCHIVE -----------------------------

// Create and add a snowflake
// let snowflake = document.createElement("div");
// snowflake.setAttribute("class", "snowflakes");
// snowflake.setAttribute("id", "snowflakeA");
// $("#jsAnimatedElements").append(snowflake);
// let mouseClickOnSnowflake = false;
// snowflake.addEventListener('click', () => {
//   mouseClickOnSnowflake = !mouseClickOnSnowflake
// });
// let mouseIsOnSnowflake = false;
// snowflake.addEventListener('mouseover', () => {
//   mouseIsOnSnowflake = !mouseIsOnSnowflake
// });

// let yPos = -10;
// let snowflakeSpeed = 0.15;
// let xStartingPos = 200;
// let xMaxBrownianShift = 1;
// let xMaxMouseoverShift = 18;
// let dodgeFactor = 20;
// let xShift = 0;
// let snowflakeReverseExcitement = 3;
// let windForce = 0.3;
// let windDirection = 1;

// function snowflakeMove() {

//   (yPos * snowflakeSpeed) < 110 ? yPos++ : yPos = -10;
//   xShift += (windForce * windDirection)

//   if (Math.round(yPos) % snowflakeReverseExcitement == 0) {
//     xShift += xMaxBrownianShift * (Math.random() - 0.5);
//   };

//   if (mouseIsOnSnowflake) {
//     // xShift += xMaxMouseoverShift * (Math.random() - 0.5);
//     yPos += dodgeFactor * (Math.random() - 0.5);
//     mouseIsOnSnowflake = !mouseIsOnSnowflake;
//   };
//   if (mouseClickOnSnowflake) {
//     snowflake.remove();
//     // ici une fonction qui genere un nouveau flocon
//     mouseClickOnSnowflake != mouseClickOnSnowflake;
//   };

//   snowflake.style.cssText = `
//   width: 30px;
//   height: 30px;
//   left: ${xStartingPos + xShift}px;
//   top:${yPos * snowflakeSpeed}vh;
//   border-radius: 50%;
//   background-color: white;
// `;
// }