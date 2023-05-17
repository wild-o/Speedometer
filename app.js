const newNum = document.getElementsByClassName("gauge-reading")[0];
const gas = document.getElementById("pedal");
const brake = document.getElementById("brake");
const shiftChange = document.getElementById("gear");
const gearHUD = document.getElementById("gear-notification");

gas.addEventListener("mousedown", Accelerate);
gas.addEventListener("mouseup", Decelerate);
brake.addEventListener("mousedown", Brake);
shiftChange.addEventListener("click", gearShift);

let LINEAR_ACC = 1 / 2;
let UPDATE = 0;
let interval = 90;
let throttle = true;

let lowerBound = 0;
let upperBound = 25;
let shiftCount = 1;

let interv = setInterval((x = lowerBound, y = upperBound) => {
  if (UPDATE > x && UPDATE < y && throttle == true) {
    UPDATE += LINEAR_ACC;
    newNum.innerHTML = UPDATE;
  }
}, interval);

function Accelerate() {
  throttle = true;
  UPDATE++;
  LINEAR_ACC = 1;

  console.log(UPDATE);
}

function Decelerate(x = lowerBound, y = upperBound) {
  LINEAR_ACC = -1;

  if (UPDATE === x) UPDATE = x + 1;
  // Add to decelerate
  if (UPDATE === y) UPDATE = y - 1;

  console.log(UPDATE);
}

function Brake() {
  throttle = false;

  var myFunction = function (x = lowerBound, y = upperBound) {
    if (UPDATE > x && UPDATE < y && throttle == false) {
      interval = 25;

      UPDATE += LINEAR_ACC;
      newNum.innerHTML = UPDATE;
      setTimeout(myFunction, interval); //How does this exactly work?
    }
  };
  setTimeout(myFunction, interval);
}

function gearShift() {
  if (!(upperBound >= 150)) {
    upperBound += 25;
    shiftCount++;
    console.log(`You are now in ${shiftCount} gear!`);
    gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
    
  } else {
    lowerBound = 0;
    upperBound = 25;
    shiftCount = 1;
    UPDATE = 0;
    newNum.innerHTML = UPDATE;
    gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
  }
}

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
