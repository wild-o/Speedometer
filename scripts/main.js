/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pacing = 100
let timestamp = (Date.now() / pacing)
let delta = 0
ctx.canvas.width  = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight / 2;

/** @type {{x: number, y: number}} */
const car = {x: 0, y: 0} // maybe use this at some point
/*
Degrees
0 = Up
90 = Right
180 = Down
270 = Left

Radians (rad)	Radians (rad)	Degrees (°)
0 rad	0 rad	0°
π/6 rad	0.5235987756 rad	30°
π/4 rad	0.7853981634 rad	45°
π/3 rad	1.0471975512 rad	60°
π/2 rad	1.5707963268 rad	90°
2π/3 rad	2.0943951024 rad	120°
3π/4 rad	2.3561944902 rad	135°
5π/6 rad	2.6179938780 rad	150°
π rad	3.1415926536 rad	180°
3π/2 rad	4.7123889804 rad	270°
2π rad	6.2831853072 rad	360°

*/
let car_x = 0;
let car_y = 0;

let vxl = 0;
let velocity_x = 0;

let vyl = 0;
let vyr = 0;
function moveCar({pos: {x = 0, y = 0}, degrees = 360}) {
  // take car pos, and move in direction the degrees says
  //handle updating the pos using delta
}
function update() {
  delta = (Date.now() / pacing) - timestamp
  timestamp = Date.now() / pacing
  ctx.clearRect(0,  0, canvas.clientWidth, canvas.height);
  // car_x += vxl;
  // car_x += vxr;
  car_x += velocity_x 
  moveCar()
  // car_y += vyl;
  // car_y += vyr;
  ctx.fillRect(car_x, car_y, 70, 50);
  
  requestAnimationFrame(update);
}
update();