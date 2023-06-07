addEventListener("keydown", function (e) {
  //   console.log(e.code);
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      rotateCar(car, 5, delta)
      break;
    case "ArrowLeft":
    case "KeyA":
      rotateCar(car, -5, delta)
      break;

    case "KeyS":
      isBrake = true;
      break;

    case "ArrowDown":
      shift(-1)
      break;

    case "ArrowUp":
      shift(1)
      break;
    case "KeyW":
      // Accelerate(car);
      throttle = true
      break;
  }
});

addEventListener("keyup", function (e) {
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      break;
    case "ArrowLeft":
    case "KeyA":
      break;

    case "KeyS":
      isBrake = false;
      break;

    case "KeyW":
      throttle = false
      break;
    case "ArrowDown":
    case "ArrowUp":
      break;

  }
});