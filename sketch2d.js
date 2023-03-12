new p5(p => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    menu = new Menu(p);
  };
  
  p.draw = () => {
    p.clear();
    p.textSize(14);
    p.text(`Keybindings:
h: Set camera to home position
d: Enable debug mode
p: Simulate discus
r: Reset the simulation`, 10, 20);
    if (typeof discus !== "undefined")
      discus.plotVelocity(p);

    menu.drawMenu(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    menu.reposition(p);
  };
}, "sketchFront");