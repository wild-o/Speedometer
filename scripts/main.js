//* neat little trick
let LINEAR_ACC = 1 / 2, // todo maybe add to car acc profiles for each gear, at and make use math based on current speed so that it has an optimal range
  BRAKE_FORCE = 2,
  throttle = false,
  lowerBound = 0,
  upperBound = 25,
  shiftCount = 1,
  isBrake = false;

/*
? maybe add thottle and brake to this, and add turning info,
? or use https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
? to get it to work smoothly that way
*/
/**
 * @type {{
 * x: number,
 * y: number, height: number,
 * width: number,
 * angle_in_degrees: number,velocity_x: number,
 * velocity_y: number,
 * currentGear: number,
 * numberOfGears: number,
 * hasReverse: boolean,
 * turningSpeed: number,
 * } car }
 */
const car = {
  x: 0,
  y: 0,
  height: 10,
  width: 20,
  angle_in_degrees: 0,
  velocity_x: 0,
  velocity_y: 0,
  velocity: 0,
  currentGear: 0,
  numberOfGears: 6, //todo figure out a way to have a performance profile for each gear
  hasReverse: true,
  turningSpeed: 10, // this is inconsistant with different numbers, maybe should work on that
};

/**
 *
 * @param {car} car the car object being rotated
 * @param {number} degrees How much to rotate by
 */
function rotateCar(car, degrees, d) {
  const currentAngle = car.angle_in_degrees;
  if ((currentAngle + degrees) * (d * car.turningSpeed) > 360) {
    car.angle_in_degrees =
      currentAngle + degrees * (d * car.turningSpeed) - 360;
  } else if ((currentAngle + degrees) * (d * car.turningSpeed) < 0) {
    car.angle_in_degrees =
      currentAngle + degrees * (d * car.turningSpeed) + 360;
  } else {
    console.log("currentAngle:          ", currentAngle);
    console.log("degrees:               ", degrees);
    console.log("d * car.turningSpeed = ", d /* * car.turningSpeed */);
    car.angle_in_degrees =
      currentAngle + degrees * (d * car.turningSpeed) /* % 360*/;
  }
  console.log("new dir:        ", car.angle_in_degrees);
}

/**
 * @param {car} car
 */
function Accelerate(car) {
  // Gotta go fast
  LINEAR_ACC = 1;
  if (shiftCount !== 0 && throttle) {
    car.velocity += LINEAR_ACC * delta;


    //todo bounds check
    if (shiftCount === -1) {
      //  car.x -= (car.velocity_x * delta)
      car.x -= car.velocity * delta * Math.cos(toRadians(car.angle_in_degrees));
      car.y -= car.velocity * delta * Math.sin(toRadians(car.angle_in_degrees));
    } else {
      //  car.x += (car.velocity_x * delta)
      car.x += car.velocity * delta * Math.cos(toRadians(car.angle_in_degrees));
      car.y += car.velocity * delta * Math.sin(toRadians(car.angle_in_degrees));
    }
  }
}

/**
 * @param {car} car
 */
function Decelerate(car) {
  LINEAR_ACC = 1;
  if (car.velocity > 0) {
    car.velocity -= LINEAR_ACC * delta;
  } else {
    car.velocity = 0;
  }
}

/**
 *? maybe have this take in a car, and use values of it, so that we could have different ones
 *? that perform differently.
 * @param {1 | -1} value
 */
function shift(value) {
  /* 
    added some logic to make it so you cant switch gears to the oposite direction while moving, 
    but it shuold be done another way, though i am not sure of how yet.
  */
  // todo refactor to make this modular for different cars
  const REVERSE = -1;
  const NEUTRAL = 0;
  if (
    value === 1 &&
    shiftCount < 6 &&
    !(shiftCount === REVERSE && car.velocity > 0)
  ) {
    upperBound += 25;
    shiftCount++;
  } else if (
    value === -1 &&
    shiftCount > REVERSE &&
    !(shiftCount === 0 && car.velocity > 0)
  ) {
    upperBound -= 25;
    shiftCount--;

    if (shiftCount == -1) {
      upperBound = 25;
    }
  }
  if (shiftCount === NEUTRAL) {
    upperBound = 0;
    // Decelerate();
  }
  gearHUD.innerHTML = `You are now in gear position:  ${shiftCount}`;
}

/**
 * @param {car} car
 * @param {number} delta
 */
function updateCarPosition(car, delta) {
  //todo take car pos, and move in direction the degrees says

  if (car.velocity_x < upperBound && throttle) {
    Accelerate(car);
  } else if (isBrake && car.velocity > 0) {
    // car.velocity_x -= (BRAKE_FORCE * delta)
    car.velocity -= BRAKE_FORCE * delta;
  } else if (!throttle) {
    Decelerate(car); // might need to use delta here
  }

  newNum.innerHTML = Math.round(car.velocity); // using round to smooth out the display

  // if (shiftCount === -1) {
  //   //  car.x -= (car.velocity_x * delta)
  //   car.x -= car.velocity * delta * Math.cos(toRadians(car.angle_in_degrees));
  //   car.y -= car.velocity * delta * Math.sin(toRadians(car.angle_in_degrees));
  // } else {
  //   //  car.x += (car.velocity_x * delta)
  //   car.x += car.velocity * delta * Math.cos(toRadians(car.angle_in_degrees));
  //   car.y += car.velocity * delta * Math.sin(toRadians(car.angle_in_degrees));
  // }
  // todo - don't let the car drive off the canvas
  const borderWidth = 2;
  function crashNoBurnFireHard() {
    isBrake = false;
    throttle = false;
    car.velocity = 0;
  }
  if (car.x + car.width + borderWidth > ctx.canvas.width) {
    crashNoBurnFireHard();
    car.x = ctx.canvas.width - (car.width + borderWidth);
  }
  if (car.x - borderWidth < 0) {
    crashNoBurnFireHard();
    car.x = borderWidth;
  }

  if (car.y - car.width + borderWidth > ctx.canvas.height) {
    // math later... too tired.
    crashNoBurnFireHard();
    car.y = ctx.canvas.height - (car.width - borderWidth);
  }

  if (car.y < 0) {
    crashNoBurnFireHard();
    car.y = borderWidth;
  }



  
  // move origin to center of car for rotation axis to be correct
  ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
  // rotate the car based on its angle
  ctx.rotate(toRadians(car.angle_in_degrees));
  // return origin
  ctx.translate(-(car.x + car.width / 2), -(car.y + car.height / 2));

  // draw the car
  ctx.fillRect(car.x, car.y, car.width, car.height); //? maybe could remove 2 translates by doing "0, 0" instead of x and y

  // move origin to center of car for rotation axis to be correct
  ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
  //return to original angle
  ctx.rotate(-toRadians(car.angle_in_degrees));
  // return origin
  ctx.translate(-(car.x + car.width / 2), -(car.y + car.height / 2));
}

/**
 * @param {number} degrees degrees 0-360
 * @returns {number} radians
 */
function toRadians(degrees) {
  return (degrees * Math.PI) / 180; // radians
}
