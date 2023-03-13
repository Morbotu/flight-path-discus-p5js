let settings = {
  discus: {
    vx: -10,
    vz: -10,
  },
  control: {
    orbit: true,
    simulate: false,
    debug: false,
    toggleDebug: false,
    homeCamera: false,
    sensitivityZoom: 0.05,
    reload: false,
  },
  menu: {
    widgets: [
      {
        type: "slider",
        location: "discus",
        target: "vx",
        minValue: -10,
        maxValue: 10,
        startValue: -10,
        step: 1,
      },
      {
        type: "slider",
        location: "discus",
        target: "vz",
        minValue: -10,
        maxValue: 10,
        startValue: -10,
        step: 1,
      },
      {
        type: "slider",
        location: "control",
        target: "sensitivityZoom",
        minValue: 0.05,
        maxValue: 1.00,
        startValue: 0.05,
        step: 0.05,
      },
      {
        type: "button",
        location: "control",
        target: "toggleDebug",
      },
      {
        type: "button",
        location: "control",
        target: "homeCamera",
      },
      {
        type: "checkbox",
        location: "control",
        target: "simulate",
      },
      {
        type: "button",
        location: "control",
        target: "reload",
      },
    ],
  },
};
