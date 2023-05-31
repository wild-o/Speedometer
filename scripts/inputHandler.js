addEventListener("keydown", function (e) {
//   console.log(e.code);
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      /*vxr = (speed
         * delta);
      console.log('update', speed)
      console.log('dt', delta)*/
      break;
    case "ArrowLeft":
    case "KeyA":

      break;

    case "KeyS":
     // vyr = 5;
      isBrake = true;
      break;
      
    case "ArrowDown":
      // gearShiftDown();
      shift(-1)
      break;

    case "ArrowUp":
      // gearShiftUp();
      shift(1)
      break;
    case "KeyW":
    //  vyl = -5;
      if (!isAcc) Accelerate();
      break;
  }
  /* if (e.code == "KeyD") vxr = 5;
  if (e.code == "KeyA") vxl = -5;
  if (e.code == "KeyS") vyr = 5;
  if (e.code == "KeyW") {
    vyl = -5;
    //Accelerate();
  }*/
});

addEventListener("keyup", function (e) {
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
    //  vxr = 0;
      break;
    case "ArrowLeft":
    case "KeyA":
    //  delta = 0;
    //  vxl = 0;
      break;

    case "KeyS":
    //  vyr = 0;
    isBrake = false;
      break;

    case "KeyW":

    if (!isDec) 
      Decelerate();
    //  vyl = 0;
      break;
    case "ArrowDown":
    case "ArrowUp":
      break;

  }
  /*  if (e.code == "KeyD") vxr = 0;
  if (e.code == "KeyA") vxl = 0;
  if (e.code == "KeyW") vyl = 0;
  if (e.code == "KeyS") vyr = 0;*/
});
