let discus;
let orbit = false;

new p5(p => {
  let cnv;
  let debug = false;
  let sensitivityZoom = 0.05;
  let simulate = false;
  
  p.setup = () => {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.camera(0, -300, 500);
    discus = new Discus(p, { vz: -10 });
  };
  
  p.draw = () => {
    p.background(220);
    if (!orbit)
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
        discus = new Discus(p, { vz: -10 });
        break;
      default:
    }
  };
  
  p.mouseWheel = event => {
    if (event.deltaY > 0) {
      cnv._curCamera._orbit(0, 0, sensitivityZoom * p.height);
    } else {
      cnv._curCamera._orbit(0, 0, -sensitivityZoom * p.height);
    }
  };
}, "sketchBack");