let settings = {
  discus: {
    vz: -10000,
    vx: 0,
    vy: -10000,
    pitch: -45,
    roll: 45,
    dt: 0.001,
    plotScale: 0.05,
    plot: "velocity",
    plotFunction: "p5.Vector.mag(value)",
    plotMin: -2000,
    plotMax: 10000,
    color: "white",
  },
  control: {
    orbit: true,
    simulate: false,
    debug: false,
    sensitivityZoom: 0.05,
    fps: 60,
    followDiscus: true,
    renderDistance: 5,
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
        type: "slider",
        location: "discus",
        target: "vz",
        minValue: -100000,
        maxValue: 100000,
        step: 1,
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
        target: "vz",
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
      {
        type: "slider",
        location: "discus",
        target: "pitch",
        minValue: 0,
        maxValue: 90,
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
        minValue: 0,
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
        target: "plotScale",
        minValue: 0.01,
        maxValue: 1,
        step: 0.01,
      },
      {
        type: "slider",
        location: "discus",
        target: "plotMin",
        minValue: -10000,
        maxValue: 0,
        step: 1,
      },
      {
        type: "slider",
        location: "discus",
        target: "plotMax",
        minValue: 0,
        maxValue: 100000,
        step: 1,
      },
      {
        type: "inputField",
        location: "discus",
        target: "plotScale",
      },
      {
        type: "inputField",
        location: "discus",
        target: "plotFunction",
      },
      {
        type: "inputField",
        location: "discus",
        target: "plot",
      },
      {
        type: "button",
        location: "events",
        target: "toggleDebug",
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
        type: "checkbox",
        location: "control",
        target: "followDiscus",
      },
      {
        type: "slider",
        location: "control",
        target: "fps",
        minValue: 1,
        maxValue: 60,
        step: 1,
      },
    ],
  },
};
