const newNum = document.getElementsByClassName("gauge-reading")[0];
const gas = document.getElementById("pedal");
const brake = document.getElementById("brake");
const shiftChange = document.getElementById("gear");
const gearHUD = document.getElementById("gear-notification");

//gas.addEventListener("mousedown", Accelerate);
//gas.addEventListener("mouseup", Decelerate);
//brake.addEventListener("mousedown", Brake);
//shiftChange.addEventListener("click", gearShift);
let LINEAR_ACC = 1 / 2;
let BRAKE_FORCE = 2;
let speed = 0;
let interval = 90;
let throttle = true;
let DIRECTION = 1;

let lowerBound = 0;
let upperBound = 25;
let shiftCount = 1;

let isAcc = false;
let isDec = false;
let isBrake = false;
// gas.addEventListener("keydown", function(e){
//   if(e.code === 'KeyW'){
//     Accelerate();
//   }
// })

// gas.addEventListener("keyup", function(e){
//   if(e.code === 'KeyS'){
//     Decelerate();
//   }
// })

let interv = setInterval((x = lowerBound, y = upperBound) => {
  if (speed == 0) {
    velocity_x = vyr = vxl = vyl = 0;
  }

  if (speed > 0) {

    velocity_x = shiftCount == -1 ? speed * delta * -1: speed * delta;

    // console.log(speed);
  }

  if (speed > x && speed < y && throttle == true) {
    speed += LINEAR_ACC;
    newNum.innerHTML = speed; //updates the speedometer
  }
  
  if (speed > y) 
  {
    LINEAR_ACC = -1;
    isDec = true;
    isAcc = false;
   // speed = upperBound;
   // newNum.innerHTML = speed;
  }

  if (isBrake && speed > 0) {
    speed -= BRAKE_FORCE;
    newNum.innerHTML = speed;
    //console.log("Braking" + BRAKE_FORCE);
  }

}, interval);

function Accelerate() {
  // Gotta go fast
  if (shiftCount !== 0) {
    throttle = true;
    if (speed == 0) speed++;
    LINEAR_ACC = 1;
    isAcc = true;
    isDec = false;
    console.log("Acc " + speed);
  }

}

function Decelerate(x = lowerBound, y = upperBound) {
  // whoa there
  LINEAR_ACC = -1;


    if (speed === x) speed = x + 1;
    // Add to decelerate
    if (speed === y) speed = y - 1;
    isDec = true;
    isAcc = false;
    console.log("Dec " + speed);

}

/*
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
    speed = 0;
    newNum.innerHTML = speed;
    gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
  }
}
function gearShiftUp() {
  if (shiftCount < 6) {
    upperBound += 25;
    shiftCount++;
    console.log(`You are now in ${shiftCount} gear!`);
    gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
    if (shiftCount == 0) {
      Decelerate();
    }
  } 
}

function gearShiftDown() {
  if (shiftCount > -1) {
    upperBound -= 25;
    shiftCount--;

    if (shiftCount == 0) {
      upperBound = 0;
      Decelerate();
    }

    if (shiftCount == -1) {
      upperBound = 25;
    }

    
    console.log(`You are now in ${shiftCount} gear!`);
    gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
  } 
} */
/**
 * @param {1 | -1} value
 */
function shift(value) {
  const REVERSE = -1
  const NEUTRAL = 0
  if (value === 1 && shiftCount < 6) {
    upperBound += 25;
    shiftCount++;
  }
  else if (value === -1 && shiftCount > REVERSE) {
    upperBound -= 25;
    shiftCount--;

    if (shiftCount == -1) {
      upperBound = 25;
    }    
  }
  if (shiftCount === NEUTRAL) {
    upperBound = 0;
    Decelerate();
  }
  console.log(`You are now in ${shiftCount} gear!`);
  gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
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
