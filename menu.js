class Menu {
  constructor(p) {
    this.sliders = [];
    this.buttons = [];
    this.checkboxes = [];
    this.inputFields = [];
    this.selects = [];
    this.sections = [];
    this.mainSectionWidgets = [];
    this.row = 0;
    this.show = true;
    this.scrolled = 0;
    this.spacing = 30;
    this.distanceTop = 30;
    this.distanceBottom = 30;
  
    this._createScrollArea(p);
    for (let widget of settings.menu.widgets) {
      switch (widget.type) {
        case "slider":
          this._createSlider(p, widget.type, widget.minValue, widget.maxValue, widget.step, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "button":
          this._createButton(p, widget.type, widget.target, widget.location);
          break;
        case "checkbox":
          this._createCheckbox(p, widget.type, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "inputField":
          this._createInputField(p, widget.type, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "select":
          this._createSelect(p, widget.type, widget.options, settings[widget.location][widget.target], widget.target, widget.location);
          break;
        case "section":
          this._createSection(p, widget.type, widget.name);
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
    this.collapseButton.mouseOver(() => settings.control.orbit = false);
    this.collapseButton.mouseOut(() => settings.control.orbit = true);
    this.collapseButton.mouseClicked(() => this._toggleShow(p));
  }

  _createSection(p, type, name) {
    let section = p.createDiv();
    let indexSection = this.sections.length;
    if (section.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      section.hide();
    section.position(p.width - 270, 45 + (this.row + this.scrolled) * this.spacing);
    section.size(15, 15);
    section.mouseOver(() => settings.control.orbit = false);
    section.mouseOut(() => settings.control.orbit = true);
    section.mouseClicked(() => this._toggleShowSection(p, indexSection));
    this.sections.push({ element: section, type, name, row: this.row, show: true, widgets: [] });
    this.row++;
  }

  _createScrollArea(p) {
    this.scrollArea = p.createDiv();
    this.scrollArea.size(270, p.height - 60);
    this.scrollArea.position(p.width - 300, 30);
    this.scrollArea.mouseOver(() => settings.control.orbit = false);
    this.scrollArea.mouseOut(() => settings.control.orbit = true);
    this.scrollArea.mouseWheel(event => {
      if (event.deltaY > 0 && this.scrolled < 0) {
        this.scrolled++;
      } else if (event.deltaY < 0 && (this.row + this.scrolled) * this.spacing + 60 > p.height - 30) {
        this.scrolled--;
      }
      this.reposition(p);
    });
  }

  _createSlider(p, type, minValue, maxValue, step, startValue, target, location) {
    let slider = p.createSlider(minValue, maxValue, startValue, step);
    if (slider.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      slider.hide();
    slider.position(p.width - 140, 45 + (this.row + this.scrolled) * this.spacing);
    slider.style("width", "100px");
    slider.mouseOver(() => settings.control.orbit = false);
    slider.mouseOut(() => settings.control.orbit = true);
    slider.input(() => {
      settings[location][target] = slider.value();
      settings.events.variableChanges[location][target] = true;
    });
    let obj = { element: slider, type, location, target, row: this.row };
    this.sliders.push(obj);
    this.sections[this.sections.length  - 1]?.widgets.push(obj) || this.mainSectionWidgets.push(obj);
    this.row++;
  }

  _createButton(p, type, target, location) {
    let button = p.createButton(target);
    if (button.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      button.hide();
    button.position(p.width - 140, 45 + (this.row + this.scrolled) * this.spacing);
    button.mouseOver(() => settings.control.orbit = false);
    button.mouseOut(() => settings.control.orbit = true);
    button.mouseClicked(() => settings[location][target] = true);
    let obj = { element: button, type, row: this.row };
    this.buttons.push(obj);
    this.sections[this.sections.length  - 1]?.widgets.push(obj) || this.mainSectionWidgets.push(obj);
    this.row++;
  }

  _createCheckbox(p, type, startValue, target, location) {
    let checkbox = p.createCheckbox(target, startValue);
    if (checkbox.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      checkbox.hide();
    checkbox.position(p.width - 140, 45 + (this.row + this.scrolled) * this.spacing);
    checkbox.mouseOver(() => settings.control.orbit = false);
    checkbox.mouseOut(() => settings.control.orbit = true);
    checkbox.changed(() => {
      settings[location][target] = checkbox.checked();
      settings.events.variableChanges[location][target] = true;
    });
    let obj = { element: checkbox, type, target, location, row: this.row };
    this.checkboxes.push(obj);
    this.sections[this.sections.length  - 1]?.widgets.push(obj) || this.mainSectionWidgets.push(obj);
    this.row++;
  }

  _createSelect(p, type, options, startValue, target, location) {
    let select = p.createSelect();
    if (select.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      select.hide();
    select.position(p.width - 140, 45 + (this.row + this.scrolled) * this.spacing);
    for (let option of options)
      select.option(option);
    select.selected(startValue);
    select.mouseOver(() => settings.control.orbit = false);
    select.mouseOut(() => settings.control.orbit = true);
    select.changed(() => {
      settings[location][target] = select.value();
      settings.events.variableChanges[location][target] = true;
    });
    let obj = { element: select, type, target, location, row: this.row };
    this.selects.push(obj);
    this.sections[this.sections.length  - 1]?.widgets.push(obj) || this.mainSectionWidgets.push(obj);
    this.row++;
  }

  _createInputField(p, type, startValue, target, location) {
    let inputField = p.createInput(startValue.toString());
    if (inputField.row + this.scrolled < 0 || (this.row + this.scrolled) * this.spacing + 60 > p.height - 30)
      inputField.hide();
    inputField.position(p.width - 140, 45 + (this.row + this.scrolled) * this.spacing);
    inputField.size(90);
    inputField.mouseOver(() => settings.control.orbit = false);
    inputField.mouseOut(() => settings.control.orbit = true);
    inputField.input(() => {
      settings[location][target] = inputField.value();
      settings.events.variableChanges[location][target] = true;
    });
    let obj = { element: inputField, type, location, target, row: this.row };
    this.inputFields.push(obj);
    this.sections[this.sections.length  - 1]?.widgets.push(obj) || this.mainSectionWidgets.push(obj);
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
      if (slider.row + this.scrolled >= 0 && (slider.row + this.scrolled) * this.spacing + 60 <= p.height - 30 && slider.element.elt.style.display != "none")
        p.text(`${slider.target} = ${slider.element.value()}`, p.width - 150, 60 + (slider.row + this.scrolled) * this.spacing);
    for (let inputField of this.inputFields)
      if (inputField.row + this.scrolled >= 0 && (inputField.row + this.scrolled) * this.spacing + 60 <= p.height - 30 && inputField.element.elt.style.display != "none")
        p.text(`${inputField.target} = `, p.width - 140, 60 + (inputField.row + this.scrolled) * this.spacing);
    for (let select of this.selects)
      if (select.row + this.scrolled >= 0 && (select.row + this.scrolled) * this.spacing + 60 <= p.height - 30 && select.element.elt.style.display != "none")
        p.text(`${select.target} = `, p.width - 140, 58 + (select.row + this.scrolled) * this.spacing);
    p.textAlign(p.LEFT, p.TOP);
    for (let section of this.sections)
      if (section.row + this.scrolled >= 0 && (section.row + this.scrolled) * this.spacing + 60 <= p.height - 30) {
        p.text(section.name, p.width - 243, 48 + (section.row + this.scrolled) * this.spacing);
        p.push();
        p.translate(p.width - 263, 52 + (section.row + this.scrolled) * this.spacing);
        if (!section.show)
          p.rotate(-p.HALF_PI);
        p.triangle(-5, -2, 0, 5, 5, -2);
        p.pop();
      }

    p.pop();
  }

  reposition(p) {
    for (let section of this.sections) {
      for (let widget of section.widgets) {
        if (widget.row + this.scrolled >= 0 && (widget.row + this.scrolled) * this.spacing + 60 <= p.height - 30) {
          if (this.show && section.show)
            widget.element.show();
          switch (widget.type) {
            default:
              widget.element.position(p.width - 140, 45 + (widget.row + this.scrolled) * this.spacing);
          }
        } else
          widget.element.hide();
      }

      if (section.row + this.scrolled >= 0 && (section.row + this.scrolled) * this.spacing + 60 <= p.height - 30) {
        if (this.show)
          section.element.show();
        section.element.position(p.width - 270, 45 + (section.row + this.scrolled) * this.spacing);
      } else
        section.element.hide();
    }

    for (let widget of this.mainSectionWidgets)
      if (widget.row + this.scrolled >= 0 && (widget.row + this.scrolled) * this.spacing + 60 <= p.height - 30) {
        if (this.show)
          widget.element.show();
        switch (widget.type) {
          default:
            widget.element.position(p.width - 140, 45 + (widget.row + this.scrolled) * this.spacing);
        }
      } else
        widget.element.hide();

    this.collapseButton.position(p.width - 297, 33);
    this.scrollArea.size(270, p.height - 60);
    this.scrollArea.position(p.width - 300, 30);
  }

  _toggleShow(p) {
    for (let section of this.sections) {
      for (let widget of section.widgets) {
        if (this.show)
          widget.element.hide();
        else if (section.show && widget.row + this.scrolled >= 0 && (widget.row + this.scrolled) * this.spacing + 60 <= p.height - 30)
          widget.element.show();
      }

      if (this.show)
        section.element.hide();
      else if (section.row + this.scrolled >= 0 && (section.row + this.scrolled) * this.spacing + 60 <= p.height - 30)
        section.element.show();
    }
    
    for (let widget of this.mainSectionWidgets)
      if (this.show)
        widget.element.hide();
      else if (widget.row + this.scrolled >= 0 && (widget.row + this.scrolled) * this.spacing + 60 <= p.height - 30)
        widget.element.show();


    if (this.show)
      this.scrollArea.hide();
    else
      this.scrollArea.show();
    this.show = !this.show;
  }

  _toggleShowSection(p, indexSection) {
    for (let widget of this.sections[indexSection].widgets) {
      if (this.sections[indexSection].show)
        widget.element.hide();
      else
        widget.element.show();
    }

    let directionCollapse  = this.sections[indexSection].show ? -1 : 1;
    this.row += directionCollapse * this.sections[indexSection].widgets.length;
    for (let i = indexSection + 1; i < this.sections.length; i++) {
      this.sections[i].row += directionCollapse * this.sections[indexSection].widgets.length;
      for (let widget of this.sections[i].widgets)
        widget.row += directionCollapse * this.sections[indexSection].widgets.length;
    }
    if ((this.row + this.scrolled) * this.spacing + 60 <= p.height - 30 && directionCollapse == -1)
      this.scrolled += this.sections[indexSection].widgets.length;
    if (this.scrolled > 0) this.scrolled = 0;

    this.sections[indexSection].show = !this.sections[indexSection].show;
    this.reposition(p);
  }
}