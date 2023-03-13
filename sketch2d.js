new p5(p => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    menu = new Menu(p);
  };
  
  p.draw = () => {
    p.clear();
    discus.plotVelocity(p);
    menu.drawMenu(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    menu.reposition(p);
  };
}, "sketchFront");