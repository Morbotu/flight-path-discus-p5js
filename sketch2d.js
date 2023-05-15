new p5(p => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    menu = new Menu(p);
  };
  
  p.draw = () => {
    p.clear();
    discus.plotVelocity(p);
    menu.drawMenu(p);

    p.push();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.text(p.round(fps), 0, 0);
    
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    menu.reposition(p);
  };
}, "sketchFront");