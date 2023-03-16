class Discus {
  constructor(p, { x=0, y=0, z=0, vx=0, vy=0, vz=0, ax=0, ay=0, az=0, pitch=0, roll=0, spinDown=0, vPitch=0, vRoll=0, vSpinDown=0, aPitch=0, aRoll=0, aSpinDown=0, dt=0.1, color="white", outsideRadius=240, insideRadius=110, detailX=24, mass=0.125, airResistanceConstant=0.21 } = {}) {
    this.detailX = detailX;
    this.outsideRadius = outsideRadius; 
    this.insideRadius = insideRadius;
    this.position = p.createVector(x, y, z);
    this.velocity = p.createVector(vx, vy, vz);
    this.acceleration = p.createVector(ax, ay, az);
    this.pitch = pitch;
    this.roll = roll;
    this.spinDown = spinDown;
    this.vPitch = vPitch;
    this.vRoll = vRoll;
    this.vSpinDown = vSpinDown;
    this.aPitch = aPitch;
    this.aRoll = aRoll;
    this.aSpinDown = aSpinDown;
    this.force = p.createVector();
    this.mass = mass;
    this.airResistanceConstant = airResistanceConstant;
    this.color = color;
    this.dt = dt;
    this.plotPoints = [];
  }
  
  update(p) {
    this._calculateForce();
    this._calculateAcceleration();
    this._calculateVelocity();
    this._calculatePosition();
    this.plotPoints.push(this.velocity.mag());
    if (this.plotPoints.length > p.width - 20)
      this.plotPoints.shift();
  }
  
  _calculatePosition() {
    this.position.add(p5.Vector.mult(this.velocity, this.dt));
    this.pitch += this.vPitch * this.dt;
    this.roll += this.vRoll * this.dt;
    this.spinDown += this.vSpinDown * this.dt;
  }
  
  _calculateVelocity() {
    this.velocity.add(p5.Vector.mult(this.acceleration, this.dt));
    this.vPitch += this.aPitch * this.dt;
    this.vRoll += this.aRoll * this.dt;
    this.vSpinDown += this.aSpinDown * this.dt;
  }
  
  _calculateAcceleration() {
    this.acceleration = p5.Vector.div(this.force, this.mass);
  }
  
  _calculateForce() {
    // this.force = p5.Vector.mult(p5.Vector.normalize(this.velocity), -this.airResistanceConstant / 1000 * this.velocity.magSq());
  }
  
  drawDiscus(p) {
    p.push();
    p.fill(this.color);
    p.translate(this.position);
    p.rotate(this.roll, this.velocity);
    p.rotate(this.pitch, p.createVector(this.velocity.z, this.velocity.y, -this.velocity.z));
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
      p.point(i + 10, p.height - 10 - this.plotPoints[i] / 10);
    }
    
    p.stroke(0);
    p.strokeWeight(1);
    p.line(10, p.height - 10, 10, p.height - 200);
    p.line(10, p.height - 10, p.width - 10, p.height - 10);
    p.pop();
  }
}