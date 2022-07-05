const StepService = require('./step.service');
const restAPI = require('./rest-api');
const wsServerAPI = require('./wsServer-api');

module.exports = class StepTracker {
  constructor(store) {
    if (store) {
      this.store = store;
    } else {
      this.store = {};
    }

    const stepService = StepService(this.store);

    // Start serving the REST API
    restAPI(stepService);

    // Start serving the WebSocket API
    wsServerAPI(stepService);
  }
};
