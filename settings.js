let settings = {
  discus: {
    vx: -10,
    vz: -10,
    color: "white",
  },
  control: {
    orbit: true,
    simulate: false,
    debug: false,
    sensitivityZoom: 0.05,
  },
  events: {
    reload: false,
    homeCamera: false,
    toggleDebug: false,
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
        minValue: -10,
        maxValue: 10,
        step: 1,
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
        type: "slider",
        location: "discus",
        target: "vz",
        minValue: -10,
        maxValue: 10,
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
        type: "button",
        location: "events",
        target: "toggleDebug",
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
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
      {
        type: "inputField",
        location: "control",
        target: "sensitivityZoom",
      },
    ],
  },
};
