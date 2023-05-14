const newNum = document.getElementsByClassName("gauge-reading")[0];
const gas = document.getElementById("pedal");
const brake = document.getElementById("brake");

gas.addEventListener("mousedown", Accelerate);
//gas.addEventListener("mouseup", Decelerate);
brake.addEventListener("mousedown", Brake);


let LINEAR_ACC = 1 / 2;
let updateInterval = 50;
let UPDATE = 0;

let interv = setInterval(() => {
  if (UPDATE > 0 && UPDATE < 200) {
    UPDATE += LINEAR_ACC;
    newNum.innerHTML = UPDATE;
  }
}, updateInterval);


function Accelerate() {
  UPDATE++;
  LINEAR_ACC = 1;

  console.log(UPDATE);
}

function Decelerate() {
  LINEAR_ACC = -1;

  if (UPDATE === 0) UPDATE = 1;
  // Add to decelerate
  if (UPDATE === 200) UPDATE = 199;

  console.log(UPDATE);
}

function Brake() {
  LINEAR_ACC = -1;
  updateInterval = 20;

  if (UPDATE === 0) UPDATE = 1;
  // Add to decelerate
  if (UPDATE === 200) UPDATE = 199;
  console.log(UPDATE)
}

//Discovery: appending innerHTML a millisecond slower makes
//a nice speed distortion effect on the tachometer

//Wondering why the Declerate function will not downtick.
//Most likely something is wrong with the logic.

//https://stackoverflow.com/questions/40016211/print-number-from-1-to-10-after-every-2-seconds

// Accelerate and Declerate need to be able to share the speed value
// Now I can perhaps use the global variable UPDATE
