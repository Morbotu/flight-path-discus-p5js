let discus;
let menu;


new p5(p => {
  let cam;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();
    cam.setPosition(0, -300, 500);
    cam.lookAt(0, 0, 0);
    p.setCamera(cam);
    discus = new Discus(p, settings.discus);
  };
  
  p.draw = () => {
    p.background(220);

    if (settings.control.orbit)
      p.orbitControl(1, 1, 0);
    if (settings.control.simulate)
      discus.update(p);
    if (settings.control.toggleDebug) {
      if (settings.control.debug)
        p.noDebugMode();
      else
        p.debugMode();
      settings.control.debug = !settings.control.debug;
      settings.control.toggleDebug = false;
    }
    if(settings.control.homeCamera) {
      p.camera(0, -300, 500, 0, 0, 0);
      settings.control.homeCamera = false;
    }
    if (settings.control.reload) {
      settings.control.reload = false;
      settings.control.simulate = false;
      for (let checkbox of menu.checkboxes)
        if (checkbox.location === "control" && checkbox.target === "simulate")
          checkbox.element.checked(false);
      discus = new Discus(p, settings.discus);
    }

    discus.drawDiscus(p);
  };
  
  p.mouseWheel = event => {
    if (!settings.control.orbit)
      return;
    if (event.deltaY > 0) {
      cam.move(0, 0, settings.control.sensitivityZoom * p.height);
    } else {
      cam.move(0, 0, -settings.control.sensitivityZoom * p.height);
    }
  };

  p.windowResized = () => {
    eyeX = cam.eyeX;
    eyeY = cam.eyeY;
    eyeZ = cam.eyeZ;
    centerX = cam.centerX;
    centerY = cam.centerY;
    centerZ = cam.centerZ;
    upX = cam.upX;
    upY = cam.upY;
    upZ = cam.upZ;

    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cam.camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
  };
}, "sketchBack");