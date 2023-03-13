class Menu {
  constructor(p) {
    this.sliders = [];
    this.buttons = [];
    this.checkboxes = [];
    this.row = 0;
    this.show = true;
  
    for (let widget of settings.menu.widgets) {
      switch (widget.type) {
        case "slider":
          this._createSlider(p, widget.minValue, widget.maxValue, widget.step, widget.startValue, widget.target, widget.location);
          break;
        case "button":
          this._createButton(p, widget.target, widget.location);
          break;
        case "checkbox":
          this._createCheckbox(p, widget.target, widget.location);
          break;
        default:
          console.error("Type widget doesn't exists in: " + widget.target);
      }
    }

    this._createShowToggleButton(p);
  }

  _createShowToggleButton(p) {
    this.button = p.createDiv();
    this.button.size(15, 15);
    this.button.position(p.width - 297, 33);
    this.button.mouseClicked(() => this.toggleShow());
  }

  _createSlider(p, minValue, maxValue, step, startValue, target, location) {
    let slider = p.createSlider(minValue, maxValue, startValue, step);
    slider.position(p.width - 140, 45 + this.row * 30);
    slider.style("width", "100px");
    slider.mousePressed(() => settings.control.orbit = false);
    slider.mouseReleased(() => settings.control.orbit = true);
    slider.changed(() => settings[location][target] = slider.value());
    this.sliders.push({ element: slider, target, row: this.row });
    this.row++;
  }

  _createButton(p, target, location) {
    let button = p.createButton(target);
    button.position(p.width - 140, 45 + this.row * 30);
    button.mousePressed(() => settings.control.orbit = false);
    button.mouseReleased(() => settings.control.orbit = true);
    button.mouseClicked(() => settings[location][target] = true);
    this.buttons.push({ element: button, row: this.row });
    this.row++;
  }

  _createCheckbox(p, target, location) {
    let checkbox = p.createCheckbox(target, false);
    checkbox.position(p.width - 140, 45 + this.row * 30);
    checkbox.mousePressed(() => settings.control.orbit = false);
    checkbox.mouseReleased(() => settings.control.orbit = true);
    checkbox.changed(() => settings[location][target] = checkbox.checked());
    this.checkboxes.push({ element: checkbox, target, location, row: this.row });
    this.row++;
  }

  drawMenu(p) {
    p.push();
    p.fill(0);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Menu", p.width - 270, 35);
    p.push();
    p.translate(p.width - 290, 40);
    if (!this.show)
      p.rotate(-p.HALF_PI);
    p.triangle(-5, -2, 0, 5, 5, -2);
    p.pop();

    p.fill(255, 50);
    if (!this.show) {
      p.rect(p.width - 300, 30, 270, 20);
      p.pop();
      return
    }
    p.rect(p.width - 300, 30, 270, p.height - 60);
    p.fill(0);
    p.textAlign(p.RIGHT, p.BASELINE);
    for (let slider of this.sliders)
      p.text(`${slider.target} = ${slider.element.value()}`, p.width - 150, 60 + slider.row * 30);
    p.pop();
  }

  reposition(p) {
    for (let slider of this.sliders)
      slider.element.position(p.width - 140, 45 + slider.row * 30);
    for (let button of this.buttons)
      button.element.position(p.width - 140, 45 + button.row * 30);
    for (let checkbox of this.checkboxes)
      checkbox.element.position(p.width - 140, 45 + checkbox.row * 30);
    this.button.position(p.width - 297, 33);
  }

  toggleShow(p) {
    for (let element of this.sliders.concat(this.buttons).concat(this.checkboxes)) {
      if (this.show)
        element.element.hide();
      else
        element.element.show();
    }
    this.show = !this.show;
  }
}