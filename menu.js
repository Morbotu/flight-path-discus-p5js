class Menu {
  constructor(p) {
    this.sliders = [];
    this.buttons = [];
    this.checkboxes = [];
    this.inputFields = [];
    this.selects = [];
    this.row = 0;
    this.show = true;
    this.scrolled = 0;
  
    this._createScrollArea(p);
    for (let widget of settings.menu.widgets) {
      switch (widget.type) {
        case "slider":
          this._createSlider(p, widget.minValue, widget.maxValue, widget.step, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "button":
          this._createButton(p, widget.target, widget.location);
          break;
        case "checkbox":
          this._createCheckbox(p, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "inputField":
          this._createInputField(p, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "select":
          this._createSelect(p, widget.options, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        default:
          console.error("Type widget doesn't exists in: " + widget.target);
      }
    }

    this._createCollapseButton(p);
  }

  _createCollapseButton(p) {
    this.collapseButton = p.createDiv();
    this.collapseButton.size(15, 15);
    this.collapseButton.position(p.width - 297, 33);
    this.collapseButton.mouseClicked(() => this._toggleShow(p));
  }

  _createScrollArea(p) {
    this.scrollArea = p.createDiv();
    this.scrollArea.size(270, p.height - 60);
    this.scrollArea.position(p.width - 300, 30);
    this.scrollArea.mouseOver(() => settings.control.orbit = false);
    this.scrollArea.mouseOut(() => settings.control.orbit = true);
    this.scrollArea.mouseWheel(event => {
      if (event.deltaY > 0 &&  this.scrolled < 0) {
        this.scrolled++;
      } else if (event.deltaY < 0 && (this.row + this.scrolled) * 30 + 60 > p.height - 30) {
        this.scrolled--;
      }
      this.reposition(p);
    });
  }

  _createSlider(p, minValue, maxValue, step, startValue, target, location) {
    let slider = p.createSlider(minValue, maxValue, startValue, step);
    if (slider.row + this.scrolled < 0 || (this.row + this.scrolled) * 30 + 60 > p.height - 30)
      slider.hide();
    slider.position(p.width - 140, 45 + (this.row + this.scrolled) * 30);
    slider.style("width", "100px");
    slider.mouseOver(() => settings.control.orbit = false);
    slider.mouseOut(() => settings.control.orbit = true);
    slider.changed(() => {
      settings[location][target] = slider.value();
      settings.events.variableChanges[location][target] = true;
    });
    this.sliders.push({ element: slider, location, target, row: this.row });
    this.row++;
  }

  _createButton(p, target, location) {
    let button = p.createButton(target);
    if (button.row + this.scrolled < 0 || (this.row + this.scrolled) * 30 + 60 > p.height - 30)
      button.hide();
    button.position(p.width - 140, 45 + (this.row + this.scrolled) * 30);
    button.mouseOver(() => settings.control.orbit = false);
    button.mouseOut(() => settings.control.orbit = true);
    button.mouseClicked(() => settings[location][target] = true);
    this.buttons.push({ element: button, row: this.row });
    this.row++;
  }

  _createCheckbox(p, startValue, target, location) {
    let checkbox = p.createCheckbox(target, startValue);
    if (checkbox.row + this.scrolled < 0 || (this.row + this.scrolled) * 30 + 60 > p.height - 30)
      checkbox.hide();
    checkbox.position(p.width - 140, 45 + (this.row + this.scrolled) * 30);
    checkbox.mouseOver(() => settings.control.orbit = false);
    checkbox.mouseOut(() => settings.control.orbit = true);
    checkbox.changed(() => {
      settings[location][target] = checkbox.checked();
      settings.events.variableChanges[location][target] = true;
    });
    this.checkboxes.push({ element: checkbox, target, location, row: this.row });
    this.row++;
  }

  _createSelect(p, options, startValue, target, location) {
    let select = p.createSelect();
    if (select.row + this.scrolled < 0 || (this.row + this.scrolled) * 30 + 60 > p.height - 30)
      select.hide();
    select.position(p.width - 140, 45 + (this.row + this.scrolled) * 30);
    for (let option of options)
      select.option(option);
    select.selected(startValue);
    select.mouseOver(() => settings.control.orbit = false);
    select.mouseOut(() => settings.control.orbit = true);
    select.changed(() => {
      settings[location][target] = select.value();
      settings.events.variableChanges[location][target] = true;
    });
    this.selects.push({ element: select, target, location, row: this.row });
    this.row++;
  }

  _createInputField(p, startValue, target, location) {
    let inputField = p.createInput(startValue.toString());
    if (inputField.row + this.scrolled < 0 || (this.row + this.scrolled) * 30 + 60 > p.height - 30)
      inputField.hide();
    inputField.position(p.width - 140, 45 + (this.row + this.scrolled) * 30);
    inputField.size(90);
    inputField.mouseOver(() => settings.control.orbit = false);
    inputField.mouseOut(() => settings.control.orbit = true);
    inputField.input(() => {
      settings[location][target] = inputField.value();
      settings.events.variableChanges[location][target] = true;
    });
    this.inputFields.push({ element: inputField, location, target, row: this.row });
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
      if (slider.row + this.scrolled >= 0 && (slider.row + this.scrolled) * 30 + 60 <= p.height - 30)
        p.text(`${slider.target} = ${slider.element.value()}`, p.width - 150, 60 + (slider.row + this.scrolled) * 30);
    for (let inputField of this.inputFields)
      if (inputField.row + this.scrolled >= 0 && (inputField.row + this.scrolled) * 30 + 60 <= p.height - 30)
        p.text(`${inputField.target} = `, p.width - 140, 60 + (inputField.row + this.scrolled) * 30);
    for (let select of this.selects)
      if (select.row + this.scrolled >= 0 && (select.row + this.scrolled) * 30 + 60 <= p.height - 30)
        p.text(`${select.target} = `, p.width - 140, 58 + (select.row + this.scrolled) * 30);
    p.pop();
  }

  reposition(p) {
    for (let slider of this.sliders)
      if (slider.row + this.scrolled >= 0 && (slider.row + this.scrolled) * 30 + 60 <= p.height - 30) {
        if (this.show)
          slider.element.show();
        slider.element.position(p.width - 140, 45 + (slider.row + this.scrolled) * 30);
      } else
        slider.element.hide();
    for (let button of this.buttons)
      if (button.row + this.scrolled >= 0 && (button.row + this.scrolled) * 30 + 60 <= p.height - 30) {
        if (this.show)
          button.element.show();
        button.element.position(p.width - 140, 45 + (button.row + this.scrolled) * 30);
      } else
        button.element.hide();
    for (let checkbox of this.checkboxes)
      if (checkbox.row + this.scrolled >= 0 && (checkbox.row + this.scrolled) * 30 + 60 <= p.height - 30) {
        if (this.show)
          checkbox.element.show();
        checkbox.element.position(p.width - 140, 45 + (checkbox.row + this.scrolled) * 30);
      } else
        checkbox.element.hide();
    for (let inputField of this.inputFields)
      if (inputField.row + this.scrolled >= 0 && (inputField.row + this.scrolled) * 30 + 60 <= p.height - 30) {
        if (this.show)
          inputField.element.show();
        inputField.element.position(p.width - 140, 45 + (inputField.row + this.scrolled) * 30);
      } else
        inputField.element.hide();
    for (let select of this.selects)
      if (select.row + this.scrolled >= 0 && (select.row + this.scrolled) * 30 + 60 <= p.height - 30) {
        if (this.show)
          select.element.show();
        select.element.position(p.width - 140, 45 + (select.row + this.scrolled) * 30);
      } else
        select.element.hide();
    this.collapseButton.position(p.width - 297, 33);
    this.scrollArea.size(270, p.height - 60);
    this.scrollArea.position(p.width - 300, 30);
  }

  _toggleShow(p) {
    for (let element of this.sliders.concat(this.buttons, this.checkboxes, this.inputFields, this.selects)) {
      if (this.show)
        element.element.hide();
      else
        element.element.show();
    }
    if (this.show)
      this.scrollArea.hide();
    else
      this.scrollArea.show();
    this.show = !this.show;
  }
}