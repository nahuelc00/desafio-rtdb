const state = {
  data: {},

  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;

    this.listeners.forEach((cb) => {
      cb();
    });
  },

  getMyName() {
    const dataState = this.getState();
    return dataState.myName;
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },
};

export { state };
