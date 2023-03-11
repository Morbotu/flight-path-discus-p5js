new p5(p => {
  let slider;
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    
    slider = p.createSlider(0, 255, 100);
    slider.position(10, 100);
    slider.style('width', '80px');
    slider.mousePressed(() => orbit = true);
    slider.mouseReleased(() => orbit = false);
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
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}, "sketchFront");