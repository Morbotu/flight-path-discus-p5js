let settings = {
  discus: {
    vz: -10,
  },
  control: {

  },
  menu: {
    widgets: [
      {
        type: "slider",
        location: "discus",
        parameter: "vz",
        minValue: -10,
        maxValue: 10,
        startValue: -10,
        step: 1,
      },
      {
        type: "slider",
        location: "discus",
        parameter: "vx",
        minValue: -10,
        maxValue: 10,
        startValue: -10,
        step: 1,
      }
    ],
  },
};
