let settings = {
  discus: {
    v: 10000,
    vz: -10000,
    vx: 0,
    vy: -10000,
    pitch: -45,
    roll: 45,
    spinDown: 0,
    dt: 0.001,
    directionAngle: true,
    // plotScale: 0.05,
    // plot: "velocity",
    // plotFunction: "p5.Vector.mag(value)",
    // plotMin: -2000,
    // plotMax: 10000,
    // color: "white",
  },
  control: {
    orbit: true,
    simulate: false,
    plot: false,
    debug: false,
    sensitivityZoom: 0.3,
    sensitivityOrbit: 10,
    fps: 60,
    followDiscus: true,
    linesFromDiscus: 10,
    ip: "192.168.182.30",
    port: "8765",
    readSensor: false,
    compass: false,
    drawBin: true,
    drawPath: true,
    referenceGround: true,
    phaseSpindown: 0,
  },
  events: {
    reload: false,
    homeCamera: false,
    toggleDebug: false,
    tpToDiscus: false,
    variableChanges: {
      control: {},
      discus: {},
    },
  },
  menu: {
    widgets: [
      {
        type: "section",
        name: "Simulation",
      },
      {
        type: "checkbox",
        location: "control",
        target: "simulate",
      },
      {
        type: "button",
        location: "events",
        target: "reload",
      },
      {
        type: "section",
        name: "Control",
      },
      {
        type: "checkbox",
        location: "control",
        target: "followDiscus",
      },
      {
        type: "checkbox",
        location: "control",
        target: "referenceGround",
      },
      {
        type: "checkbox",
        location: "control",
        target: "drawBin",
      },
      {
        type: "checkbox",
        location: "control",
        target: "drawPath",
      },
      {
        type: "button",
        location: "events",
        target: "tpToDiscus",
      },
      {
        type: "button",
        location: "events",
        target: "homeCamera",
      },
      {
        type: "section",
        name: "Sensor",
      },
      {
        type: "inputField",
        location: "control",
        target: "ip",
      },
      {
        type: "checkbox",
        location: "control",
        target: "readSensor",
      },
      {
        type: "checkbox",
        location: "control",
        target: "compass",
      },
      {
        type: "slider",
        location: "control",
        target: "phaseSpindown",
        minValue: 0,
        maxValue: 360,
        step: 1,
      },
      {
        type: "inputField",
        location: "control",
        target: "phaseSpindown",
      },
      {
        type: "section",
        name: "Initial conditions",
      },
      {
        type: "checkbox",
        location: "discus",
        target: "directionAngle",
      },
      {
        type: "slider",
        location: "discus",
        target: "v",
        minValue: 0,
        maxValue: 100000,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "v",
      },
      {
        type: "slider",
        location: "discus",
        target: "pitch",
        minValue: -90,
        maxValue: 0,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "pitch",
      },
      {
        type: "slider",
        location: "discus",
        target: "roll",
        minValue: -90,
        maxValue: 90,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "roll",
      },
      {
        type: "slider",
        location: "discus",
        target: "spinDown",
        minValue: 0,
        maxValue: 360,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "spinDown",
      },
      {
        type: "slider",
        location: "discus",
        target: "vx",
        minValue: -100000,
        maxValue: 100000,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "vx",
      },
      {
        type: "slider",
        location: "discus",
        target: "vy",
        minValue: -100000,
        maxValue: 0,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "vy",
      },
      {
        type: "slider",
        location: "discus",
        target: "vz",
        minValue: -100000,
        maxValue: 100000,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "vz",
      },
      {
        type: "slider",
        location: "discus",
        target: "dt",
        minValue: 0.001,
        maxValue: 1.00,
        step: 0.001,
      },
      {
        type: "inputField",
        location: "discus",
        target: "dt",
      },
    ],
  },
};
