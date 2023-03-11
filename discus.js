class Discus {
  constructor(p, { x=0, y=0, z=0, vx=0, vy=0, vz=0, ax=0, ay=0, az=0, outsideRadius=240, insideRadius=110, detailX=24, mass=0.125, airResistanceConstant=0.001 } = {}) {
    this.detailX = detailX;
    this.outsideRadius = outsideRadius;
    this.insideRadius = insideRadius;
    this.position = p.createVector(x, y, z);
    this.velocity = p.createVector(vx, vy, vz);
    this.acceleration = p.createVector(ax, ay, az);
    this.force = p.createVector();
    this.mass = mass;
    this.airResistanceConstant = airResistanceConstant;
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
    this.position.add(this.velocity);
  }
  
  _calculateVelocity() {
    this.velocity.add(this.acceleration);
  }
  
  _calculateAcceleration() {
    this.acceleration = p5.Vector.div(this.force, this.mass);
  }
  
  _calculateForce() {
    this.force = p5.Vector.mult(this.velocity, -this.airResistanceConstant * p5.Vector.mag(this.velocity));
  }
  
  drawDiscus(p) {
    p.push();
    p.translate(this.position);
    p.cylinder(this.outsideRadius, 4, this.detailX, 1, false, false);
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
      p.point(i + 10, p.height - 10 - 15 * this.plotPoints[i]);
    }
    
    p.stroke(0);
    p.strokeWeight(1);
    p.line(10, p.height - 10, 10, p.height - 200);
    p.line(10, p.height - 10, p.width - 10, p.height - 10);
    p.pop();
  }
}