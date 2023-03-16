let settings = {
  discus: {
    vx: -1000,
    vz: -1000,
    dt: 0.1,
    color: "white",
  },
  control: {
    orbit: true,
    simulate: false,
    debug: false,
    sensitivityZoom: 0.05,
    fps: 60,
    followDiscus: true,
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
        target: "vx",
        minValue: -1000,
        maxValue: 1000,
        step: 10,
      },
      {
        type: "slider",
        location: "discus",
        target: "vz",
        minValue: -1000,
        maxValue: 1000,
        step: 1,
      },
      {
        type: "slider",
        location: "control",
        target: "sensitivityZoom",
        minValue: 0.05,
        maxValue: 1.00,
        step: 0.05,
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
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "select",
        location: "discus",
        target: "color",
        options: [
          "white",
          "red",
          "blue",
        ],
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
    ],
  },
};
