function ngon(p, n, outsideRadius, insideRadius) {
  p.beginShape(p.TESS);
  for (let angle = 0; angle <= p.TWO_PI; angle += p.TWO_PI / n) {
    px = p.sin(angle) * outsideRadius;
    pz = p.cos(angle) * outsideRadius;
    p.vertex(px, 0, pz);
  }
  for (let angle = 0; angle <= p.TWO_PI; angle += p.TWO_PI / n) {
    px = p.sin(angle) * insideRadius;
    pz = p.cos(angle) * insideRadius;
    p.vertex(px, 0, pz);
  }
  p.endShape();
}

