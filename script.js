// GLOBAL FUNCTIONS
function $(selector) {
  return document.querySelector(selector)
}

let GLOBALHOnWRate = window.innerHeight / window.innerWidth;
console.log(GLOBALHOnWRate);
let GLOBALCurrentSeason="";

// Normal distributions
function randn_bm() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num
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
  GLOBALCurrentSeason=id
  $("#styleSheet").setAttribute("href", `${id}Style.css`);
};

// Seasons objects list generation
let seasons = []
for (item of ["fall", "winter", "spring", "summer"]) {
  seasons.push(
    new Season(item)
  );
};



// WINTER =====================================================
// Snowflakes ------------------------------------------------
let initSnowflakesNb = 100;
let currentSnowflakes = [];
let snowflakeTypes = ["front", "middle", "back"];
let currentSnowflakeType = ""

function Snowflake(num) {
  console.log("snowflake generated");

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

  this.currentSnowflakeType = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
  switch (this.currentSnowflakeType) {
    case "front":
      this.xStartingPos = (120 * Math.random()) - 10;
      this.yStartingPos = (-1400 * Math.random()) - 10;
      this.snowflakeSpeed = 0.04 + (0.2 * randn_bm());
      this.snowflakeWidth = 2 + (1.5*Math.random());
      this.snowflakeHeight = this.snowflakeWidth / GLOBALHOnWRate;
      this.backGroundColor = "#d7d6d7";
      this.zIndex = 2;
      this.xMaxBrownianShift = 0.5;
      this.snowflakeReverseExcitement = 2;
      this.windForce = 0.1;
      this.windDirection = 1;
      this.windReverseVariationRate = 5000;
      this.snowflakeOpcacity = 0.6+(0.1 *randn_bm())
      break;
    case "middle":
      this.xStartingPos = (120 * Math.random()) - 10;
      this.yStartingPos = (-1500 * Math.random()) - 10;
      this.snowflakeSpeed = 0.02 + (0.1 * randn_bm());
      this.snowflakeWidth = 1.2 + (Math.random());
      this.snowflakeHeight = this.snowflakeWidth / GLOBALHOnWRate;
      this.backGroundColor = "#a4a4a4";
      this.zIndex = 1;
      this.xMaxBrownianShift = 0.3;
      this.snowflakeReverseExcitement = 5;
      this.windForce = 0.05;
      this.windDirection = 1;
      this.windReverseVariationRate = 100000;
      this.snowflakeOpcacity = 0.8+(0.05 *randn_bm())
      break;
    case "back":
      this.xStartingPos = (120 * Math.random()) - 10;
      this.yStartingPos = (-1600 * Math.random()) - 10;
      this.snowflakeSpeed = 0.01 + (0.1 * randn_bm());
      this.snowflakeWidth = 1 + (0.5*Math.random());
      this.snowflakeHeight = this.snowflakeWidth / GLOBALHOnWRate;
      this.backGroundColor = "#5c535a";
      this.zIndex = 0;
      this.xMaxBrownianShift = 0.1;
      this.snowflakeReverseExcitement = 10;
      this.windForce = 0.01;
      this.windDirection = 1;
      this.windReverseVariationRate = 1000000;
      this.snowflakeOpcacity = 0.9+(0.005 *randn_bm())
      break;

    default:
      break;
  }

  // let xMaxMouseoverShift = 1;
  // let dodgeFactor = -20;
  let xShift = 0;
  this.snowflakeMove = () => {
    // Wind variation
    if (Math.round(this.yStartingPos) % this.windReverseVariationRate == 0) {
      this.windForce *= randn_bm() + 0.5;
      this.windDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    };

    // Mooving down
    (this.yStartingPos * this.snowflakeSpeed) < 110 ? this.yStartingPos++ : this.yStartingPos = -10;

    // Mooving sideway
    if (this.xStartingPos + xShift > 110) {
      xShift = 0;
      this.xStartingPos = -10;
    } else if (this.xStartingPos + xShift < -10) {
      xShift = 0;
      this.xStartingPos = 110;
    } else {
      xShift += (this.windForce * this.windDirection);
    }

    if (Math.round(this.yStartingPos) % this.snowflakeReverseExcitement == 0) {
      xShift += this.xMaxBrownianShift * (randn_bm() - 0.5);
    };

    // if (this.mouseIsOnSnowflake) {
    //   xShift += xMaxMouseoverShift * (randn_bm() - 0.5);
    //   this.yStartingPos += dodgeFactor * (randn_bm());
    //   this.backGroundColor = "red";
    //   setTimeout(() => this.backGroundColor = "white", 1000);
    //   this.mouseIsOnSnowflake = !this.mouseIsOnSnowflake;
    // };

    if (this.mouseIsOnSnowflake) {
      this.docElement.remove();
      addSnowflake()
      this.mouseIsOnSnowflake = false;
    };

    this.docElement.style.cssText = `
    width: ${this.snowflakeWidth}vw;
    height: ${this.snowflakeHeight}vh;
    left: ${this.xStartingPos + xShift}vw;
    top:${this.yStartingPos * this.snowflakeSpeed}vh;
    border-radius: 50%;
    background-color: ${this.backGroundColor};
    z-index:${this.zIndex};
    opacity:${this.snowflakeOpcacity};
  `;
  }
}

// Snowflakes initilisation
for (i = 0; i < initSnowflakesNb; i++) {
  currentSnowflakes.push(new Snowflake(i));
}

function addSnowflake() {
  currentSnowflakes.push(new Snowflake((currentSnowflakes.length + 1)));
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