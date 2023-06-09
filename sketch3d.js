let discus;
let menu;
let fps;
let websocket;

new p5(p => {
  let cam;
  let updatesPerFrame;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();
    cam.setPosition(0, -300, 500);
    cam.lookAt(0, 0, 0);
    cam.perspective(p.PI / 3.0, p.width / p.height, 0.1, 100000);
    p.setCamera(cam);
    p.frameRate(settings.control.fps);
    discus = new Discus(p, settings.discus);
    updatesPerFrame = 1 / settings.control.fps / discus.dt;
  };

  p.draw = () => {
    p.background(220);

    if (settings.control.orbit)
      p.orbitControl(settings.control.sensitivityOrbit, settings.control.sensitivityOrbit, 0);

    let startPosition = discus.position.copy();
    if (settings.control.simulate) {
      if (updatesPerFrame > 1) {
        for (let i = 0; i < updatesPerFrame; i++)
          discus.update(p);
      } else if (p.frameCount % p.round(1 / updatesPerFrame) === 0) {
        discus.update(p);
      }
    }

    if (settings.events.toggleDebug) {
      if (settings.control.debug)
        p.noDebugMode();
      else
        p.debugMode();
      settings.control.debug = !settings.control.debug;
      settings.events.toggleDebug = false;
    }
    if (settings.events.homeCamera) {
      p.camera(0, -300, 500, 0, 0, 0);
      settings.events.homeCamera = false;
    }
    if (settings.events.reload) {
      settings.events.reload = false;
      settings.control.simulate = false;
      settings.events.variableChanges.control.simulate = true;
      p.frameRate(settings.control.fps);
      discus = new Discus(p, settings.discus);
      updatesPerFrame = 1 / settings.control.fps / discus.dt;
    }
    for (let [location, parameters] of Object.entries(settings.events.variableChanges))
      for (let [target, value] of Object.entries(parameters))
        if (value) {
          settings.events.variableChanges[location][target] = false;
          for (let element of menu.sliders.concat(menu.inputFields, menu.selects))
            if (element.location === location && element.target === target)
              element.element.value(settings[location][target]);
          for (let element of menu.checkboxes)
            if (element.location === location && element.target === target)
              element.element.checked(settings[location][target]);
          if (!settings.control.simulate && (location != "control" || target != "simulate") && (location != "control" || target != "followDiscus")) {
            discus = new Discus(p, settings.discus);
            p.frameRate(settings.control.fps);
            updatesPerFrame = 1 / settings.control.fps / discus.dt;
          }
          if (location === "control" && target === "readSensor") {
            if (settings.control.readSensor)
              connectWebsocket();
            else
              websocket.close();
          }
        }

    fps = p.frameRate();
    if (settings.control.followDiscus) {
      let dPosition = p5.Vector.sub(discus.position, startPosition);
      cam.setPosition(dPosition.x + cam.eyeX, dPosition.y + cam.eyeY, dPosition.z + cam.eyeZ);
    }
    if (settings.events.tpToDiscus) {
      if (settings.control.drawPath && !settings.control.simulate) {
        cam.setPosition(0, -300, 500);
        cam.lookAt(0, 0, 0);
      } else {
        cam.setPosition(discus.position.x, discus.position.y - 300, discus.position.z + 500);
        cam.lookAt(discus.position.x, discus.position.y, discus.position.z);
      }
      settings.events.tpToDiscus = false;
    }

    discus.drawDiscus(p);
    if (settings.control.drawBin) {
      drawBin(p, -1100, -7000, 600, 400, 220, "yellow");
      drawBin(p, 500, -7000, 400, 300, 220, "blue");
      drawBin(p, -150, -8000, 300, 400, 325, "red");
    }
    if (settings.control.drawPath) {
      discus.drawDots(p);
    }
    if (settings.control.referenceGround)
      drawReferenceGround(p, settings.control.linesFromDiscus, cam);
  };

  p.mouseWheel = event => {
    if (!settings.control.orbit)
      return;
    if (event.deltaY > 0) {
      cam.move(0, 0, settings.control.sensitivityZoom * p.height);
    } else {
      cam.move(0, 0, -settings.control.sensitivityZoom * p.height);
    }
  };

  p.windowResized = () => {
    eyeX = cam.eyeX;
    eyeY = cam.eyeY;
    eyeZ = cam.eyeZ;
    centerX = cam.centerX;
    centerY = cam.centerY;
    centerZ = cam.centerZ;
    upX = cam.upX;
    upY = cam.upY;
    upZ = cam.upZ;

    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cam.camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
    cam.perspective(p.PI / 3.0, p.width / p.height, 0.1, 100000);
  };
}, "sketchBack");

function connectWebsocket() {
  websocket = new WebSocket(`ws://${settings.control.ip}:8765/`);
  websocket.onopen = () => console.log("Connection made");
  websocket.onmessage = ms => {
    let recvData = ms.data.split(':');
    console.log(recvData);
    if (settings.control.readSensor) {
      settings.discus.roll = recvData[0];
      settings.discus.pitch = recvData[1];
      settings.events.variableChanges.discus.roll = true;
      settings.events.variableChanges.discus.pitch = true;
      if (settings.control.compass) {
        settings.discus.spinDown = Number(recvData[2]) + settings.control.phaseSpindown;
        settings.events.variableChanges.discus.spinDown = true;
      }
    }
    websocket.send("received");
  };

  websocket.onclose = event => console.log("Connection closed: " + event.code);
}

function drawReferenceGround(p, linesFromDiscus, cam) {
  let position = settings.control.followDiscus ? discus.position : p.createVector(cam.eyeX, cam.eyeY, cam.eyeZ);
  let linesX = position.x % 1000;
  let linesZ = position.z % 1000;

  p.push();
  p.fill("black");
  p.noStroke();

  for (let i = 0; i < p.floor(linesFromDiscus); i++) {
    p.push();
    p.translate(position.x - linesX - 1000 * i, 0, position.z - linesZ);
    p.rotateX(p.HALF_PI);
    p.cylinder(5, 2000 * linesFromDiscus, 24, 1, false, false);
    p.pop();
    p.push();
    p.translate(position.x - linesX + 1000 * i, 0, position.z - linesZ);
    p.rotateX(p.HALF_PI);
    p.cylinder(5, 2000 * linesFromDiscus, 24, 1, false, false);
    p.pop();
    p.push();
    p.translate(position.x - linesX, 0, position.z - linesZ - 1000 * i);
    p.rotateZ(p.HALF_PI);
    p.cylinder(5, 2000 * linesFromDiscus, 24, 1, false, false);
    p.pop();
    p.push();
    p.translate(position.x - linesX, 0, position.z - linesZ + 1000 * i);
    p.rotateZ(p.HALF_PI);
    p.cylinder(5, 2000 * linesFromDiscus, 24, 1, false, false);
    p.pop();
  }
  p.pop();
}

function drawBin(p, positionX, positionZ, width, length, height, color) {
  p.push();
  p.fill(color);
  p.translate(positionX + width / 2, -height / 2, positionZ);
  p.plane(width, height);
  p.translate(0, 0, -length);
  p.plane(width, height);
  p.translate(-width / 2, 0, length / 2);
  p.rotateY(p.HALF_PI);
  p.plane(length, height);
  p.translate(0, 0, width);
  p.plane(length, height);
  p.pop();
}