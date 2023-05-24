/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pacing = 200
let timestamp = (Date.now() / pacing)
let delta = 0
ctx.canvas.width  = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight / 2;

/** @type {{x: number, y: number}} */
const car = {x: 0, y: 0} // maybe use this at some point

let x = 0;
let y = 0;

let vxl = 0;
let vxr = 0;

let vyl = 0;
let vyr = 0;

function update() {
  delta = (Date.now() / pacing) - timestamp
  timestamp = Date.now() / pacing
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  x += vxl;
  x += vxr;

  y += vyl;
  y += vyr;

  ctx.fillRect(x, y, 70, 50);
  
  requestAnimationFrame(update);
}
update();