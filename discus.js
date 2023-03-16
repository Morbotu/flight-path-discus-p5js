class Discus {
  constructor(p, { x=0, y=0, z=0, vx=0, vy=0, vz=0, ax=0, ay=0, az=0, pitch=0, roll=0, spinDown=0, vPitch=0, vRoll=0, vSpinDown=0, aPitch=0, aRoll=0, aSpinDown=0, dt=0.1, color="white", outsideRadius=240, insideRadius=110, detailX=24, mass=0.125, airResistanceConstant=0.21, plot="velocity", plotFunction=(value) => p5.Vector.mag(value), plotSteps=20, plotScale=0.1 } = {}) {
    this.detailX = detailX;
    this.outsideRadius = outsideRadius; 
    this.insideRadius = insideRadius;
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
    this.plotFunction = plotFunction;
    this.plotBottomLeft = p.createVector(40, 30);
    this.plotHeight = 200;
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
    this.force = p5.Vector.add(p.createVector(0, 9810 * this.mass, 0), p5.Vector.mult(p5.Vector.normalize(this.velocity), -this.airResistanceConstant / 1000 * this.velocity.magSq()));
    // let forceGravity = 9.81 * this.mass;
    // let 
  }
  
  drawDiscus(p) {
    p.push();
    p.fill(this.color);
    p.translate(this.position);
    p.rotate(this.roll, this.velocity);
    p.rotate(this.pitch, p.createVector(this.velocity.z, 0, -this.velocity.x));
    p.rotateY(this.spinDown);
    p.cylinder(this.outsideRadius, 4, this.detailX, 1, false, false);
    p.cylinder(this.insideRadius, 4, this.detailX, 1, false, false);
    p.translate(0, 2, 0);
    ngon(p, this.detailX - 1, this.outsideRadius, this.insideRadius);
    p.translate(0, -4, 0);
    ngon(p, this.detailX - 1, this.outsideRadius, this.insideRadius);
    p.pop();
  }
  
  plotVelocity(p) {
    p.push();
    p.strokeWeight(3);
    p.stroke("red");
    for (let i = 0; i < this.plotPoints.length; i++) {
      p.point(i + this.plotBottomLeft.x, p.height - this.plotBottomLeft.y - this.plotPoints[i] * this.plotScale);
    }
    
    p.stroke(0);
    p.strokeWeight(1);
    p.line(this.plotBottomLeft.x, p.height - this.plotBottomLeft.y, this.plotBottomLeft.x, p.height - this.plotHeight - this.plotBottomLeft.y);
    p.line(this.plotBottomLeft.x, p.height - this.plotBottomLeft.y, p.width - this.plotWidth, p.height - this.plotBottomLeft.y);

    p.textSize(8);
    for (let i = 0; i <= this.plotHeight / this.plotSteps; i++) {
      p.text(p.round(i * this.plotSteps / this.plotScale), this.plotBottomLeft.x - 30, p.height - this.plotBottomLeft.y - i * this.plotSteps);
    }
    
    for (let i = 0; i < p.width - this.plotWidth - this.plotBottomLeft.x; i += 30) {
      p.text(p.round((i + this.plotTimeStart) * this.dt, 3), this.plotBottomLeft.x + i, p.height - this.plotBottomLeft.y + 10);
    }

    p.pop();
  }
}