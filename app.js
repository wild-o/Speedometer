const newNum = document.getElementsByClassName("gauge-reading")[0];
const gas = document.getElementById("pedal");
const brake = document.getElementById("brake");
const shiftChange = document.getElementById("gear");
const gearHUD = document.getElementById("gear-notification");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pacing = 100
let timestamp = (Date.now() / pacing)
let delta = 0

ctx.canvas.width = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight / 2;

//Discovery: appending innerHTML a millisecond slower makes
//a nice speed distortion effect on the tachometer

//Wondering why the Declerate function will not downtick.
//Most likely something is wrong with the logic.

//https://stackoverflow.com/questions/40016211/print-number-from-1-to-10-after-every-2-seconds

// Accelerate and Declerate need to be able to share the speed value
// Now I can perhaps use the global variable UPDATE

//On the Brake function, it was suggested to use a recursive function
//Not fully understanding why this works just yet:
//https://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running



function loopDeLoop() {
  delta = (Date.now() / pacing) - timestamp
  timestamp = Date.now() / pacing
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  updateCarPosition(car, delta)

  requestAnimationFrame(loopDeLoop);
}
loopDeLoop();