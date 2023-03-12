class Menu {
  constructor(p) {
    this.sliders = [];
    this.row = 0;
    this.orbit = true;

    for (let widget of settings.menu.widgets) {
      switch (widget.type) {
        case "slider":
          this.createSlider(p, widget.minValue, widget.maxValue, widget.step, widget.startValue, widget.parameter);
          break;
        default:
          console.error("Type widget doesn't exists in: " + widget.parameter);
      }
    }
    
  }

  createSlider(p, minValue, maxValue, step, startValue, target) {
    let slider = p.createSlider(minValue, maxValue, startValue, step);
    slider.position(p.width - 140, 30 + this.row * 30);
    slider.style("width", "100px");
    slider.mousePressed(() => this.orbit = false);
    slider.mouseReleased(() => this.orbit = true);
    slider.changed(() => settings.discus[target] = slider.value());
    this.sliders.push({ slider, target, row: this.row });
    this.row++;
  }

  drawMenu(p) {
    p.push();
    p.fill(255, 50);
    p.rect(p.width - 220, 30, 190, 200);

    p.fill(0);
    for (let slider of this.sliders)
      p.text(`${slider.target} = ${slider.slider.value()}`, p.width - 210, 45 + slider.row * 30);
    p.pop();
  }

  reposition(p) {
    for (let slider of this.sliders) {
      slider.slider.position(p.width - 140, 30 + slider.row * 30);
    }
  }
}