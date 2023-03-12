let discus;
let menu;


new p5(p => {
  let cam;
  let debug = false;
  let sensitivityZoom = 0.05;
  let simulate = false;
  
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
    if (menu.orbit)
      p.orbitControl(1, 1, 0);
    if (simulate)
      discus.update(p);
    discus.drawDiscus(p);
  };
  
  p.keyPressed = () => {
    switch (p.key) {
      case 'h':
        p.camera(0, -300, 500, 0, 0, 0);
        break;
      case 'd':
        if (debug)
          p.noDebugMode();
        else
          p.debugMode();
        debug = !debug;
        break;
      case 'p':
        simulate = !simulate;
        break;
      case 'r':
        simulate = false;
        discus = new Discus(p, settings.discus);
        break;
      default:
    }
  };
  
  p.mouseWheel = event => {
    if (event.deltaY > 0) {
      cam.move(0, 0, sensitivityZoom * p.height);
    } else {
      cam.move(0, 0, -sensitivityZoom * p.height);
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