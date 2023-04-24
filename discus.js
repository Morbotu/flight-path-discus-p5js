class Discus {
  constructor(p, { x=0, y=0, z=0, vx=0, vy=0, vz=0, ax=0, ay=0, az=0, pitch=0, roll=0, spinDown=0, vPitch=0, vRoll=0, vSpinDown=0, aPitch=0, aRoll=0, aSpinDown=0, dt=0.1, color="white", outsideRadius=240, insideRadius=110, thickness=4, detailX=24, mass=0.125, airResistanceConstant=0.21e-3, plot="velocity", plotFunction="p5.Vector.mag(value)", plotSteps=20, plotScale=0.1, plotMin=0, plotMax=10000 } = {}) {
    this.detailX = detailX;
    this.outsideRadius = outsideRadius; 
    this.insideRadius = insideRadius;
    this.thickness = thickness;
    this.position = p.createVector(x, y, z);
    this.velocity = p.createVector(vx, vy, vz);
    this.acceleration = p.createVector(ax, ay, az);
    this.pitch = p.radians(pitch);
    this.roll = p.radians(roll);
    this.spinDown = p.radians(spinDown);
    this.vPitch = p.radians(vPitch);
    this.vRoll = p.radians(vRoll);
    this.vSpinDown = p.radians(vSpinDown);
    this.aPitch = p.radians(aPitch);
    this.aRoll = p.radians(aRoll);
    this.aSpinDown = p.radians(aSpinDown);
    this.force = p.createVector();
    this.mass = mass;
    this.airResistanceConstant = airResistanceConstant;
    this.color = color;
    this.dt = dt;
    this.plotPoints = [];
    this.plot = plot;
    this.plotFunction = (value) => eval(plotFunction);
    this.plotBottomLeft = p.createVector(40, 30);
    this.plotMin = plotMin;
    this.plotMax = plotMax;
    this.plotWidth = 400;
    this.plotSteps = plotSteps;
    this.plotScale = plotScale;
    this.plotTimeStart = 0;
  }
  
  update(p) {
    this._calculateForce(p);
    this._calculateAcceleration(p);
    this._calculateVelocity(p);
    this._calculatePosition(p);
    this.plotPoints.push(this.plotFunction(this[this.plot]));
    while (this.plotPoints.length > p.width - this.plotWidth - this.plotBottomLeft.x) {
      this.plotPoints.shift();
      this.plotTimeStart++;
    }

    if (this.position.y > 0) {
      settings.events.variableChanges.control.simulate = true;
      settings.control.simulate = false;
    }
  }
  
  _calculatePosition(p) {
    this.position.add(p5.Vector.mult(this.velocity, this.dt));
    this.pitch += this.vPitch * this.dt;
    this.roll += this.vRoll * this.dt;
    this.spinDown += this.vSpinDown * this.dt;
  }
  
  _calculateVelocity(p) {
    this.velocity.add(p5.Vector.mult(this.acceleration, this.dt));
    this.vPitch += this.aPitch * this.dt;
    this.vRoll += this.aRoll * this.dt;
    this.vSpinDown += this.aSpinDown * this.dt;
  }
  
  _calculateAcceleration(p) {
    this.acceleration = p5.Vector.div(this.force, this.mass);
  }
  

  _calculateForce(p) {
    let forceGravity = p.createVector(0, 9810 * this.mass, 0);
    let aOutside = this.outsideRadius * p.sin(this.roll - p.createVector(this.velocity.x, this.velocity.y).heading());
    let bOutside = this.outsideRadius * p.sin(this.pitch + p.createVector(this.velocity.z, this.velocity.y).heading());
    let aInside = this.insideRadius * p.sin(this.roll - p.createVector(this.velocity.x, this.velocity.y).heading());
    let bInside = this.insideRadius * p.sin(this.pitch + p.createVector(this.velocity.z, this.velocity.y).heading());
    let surfaceArea = p.abs(p.PI * (aOutside * bOutside - aInside * bInside));

    let airResistanceWithoutConstant = 0.5 * 1.293e-9 * surfaceArea * this.velocity.magSq();

    let drag = this.velocity
      .copy()
      .normalize()
      .mult(-airResistanceWithoutConstant * 0.21);
    let normalDiscus = p.createVector(p.cos(this.pitch) * p.sin(this.roll), -p.cos(this.pitch) * p.cos(this.roll), -p.sin(this.pitch));
    let lift = this.velocity
      .copy()
      .normalize()
      .reflect(normalDiscus)
      .mult(airResistanceWithoutConstant * 0.21);

    this.force = forceGravity.add(drag).add(lift);
  }
  
  drawDiscus(p) {
    p.push();
    p.fill(this.color);
    p.translate(this.position);
    p.rotateZ(this.roll);
    p.rotateX(this.pitch);
    p.rotateY(this.spinDown);
    p.cylinder(this.outsideRadius, this.thickness, this.detailX, 1, false, false);
    p.cylinder(this.insideRadius, this.thickness, this.detailX, 1, false, false);
    p.translate(0, this.thickness / 2, 0);
    ngon(p, this.detailX - 1, this.outsideRadius, this.insideRadius);
    p.translate(0, -this.thickness, 0);
    ngon(p, this.detailX - 1, this.outsideRadius, this.insideRadius);
    p.pop();
  }
  
  plotVelocity(p) {
    p.push();
    p.strokeWeight(3);
    p.stroke("red");
    for (let i = 0; i < this.plotPoints.length; i++) {
      p.point(i + this.plotBottomLeft.x, p.height - this.plotBottomLeft.y - this.plotPoints[i] * this.plotScale + this.plotMin * this.plotScale);
    }
    
    p.stroke(0);
    p.strokeWeight(1);
    p.line(this.plotBottomLeft.x, p.height - this.plotBottomLeft.y, this.plotBottomLeft.x, p.height - (this.plotMax - this.plotMin) * this.plotScale - this.plotBottomLeft.y);
    p.line(this.plotBottomLeft.x, p.height - this.plotBottomLeft.y + this.plotMin * this.plotScale, p.width - this.plotWidth, p.height - this.plotBottomLeft.y + this.plotMin * this.plotScale);

    p.textSize(8);
    for (let i = p.ceil(this.plotMin / this.plotSteps); i <= this.plotMax * this.plotScale; i += this.plotSteps) {
      p.text(p.round(i / this.plotScale), this.plotBottomLeft.x - 30, p.height - this.plotBottomLeft.y + this.plotMin * this.plotScale - i);
    }

    for (let i = 30; i < p.width - this.plotWidth - this.plotBottomLeft.x; i += 30) {
      p.text(p.round((i + this.plotTimeStart) * this.dt, 3), this.plotBottomLeft.x + i, p.height - this.plotBottomLeft.y + this.plotMin * this.plotScale + 10);
    }

    p.pop();
  }
}