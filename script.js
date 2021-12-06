// SEASONS SWAP BUTTONS MAIN SETTINGS -----------------------------------
// Season object constructeur declaration 
function Season(id) {
  this.seasonId = id,
    this.seasonBtn = document.querySelector(`#${id}`),
    this.styleSheetCall = document.querySelector(`#${id}`).addEventListener('click', () => switchSeasonPageStyle(id)),
    this.mouseOverBtn = document.querySelector(`#${id}`).addEventListener('mouseover', () => seasonBtnMouseOver(id)),
    this.mouseLeaveBtn = document.querySelector(`#${id}`).addEventListener('mouseout', () => seasonBtnMouseOut(id))
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
  document.querySelector("#styleSheet").setAttribute("href", `${id}Style.css`);
};

// Seasons objects list generation
let seasons = []
for (item of ["fall", "winter", "spring", "summer"]) {
  seasons.push(
    new Season(item)
  );
};


// FALL ---------------------------------

let leaf = document.createElement("div");
leaf.textContent = 'TEST';
leaf.style.cssText=`
color : red;
position : absolute;
transform: translate(150%, 0);
`;
document.querySelector("#jsAnimatedElements").append(leaf);