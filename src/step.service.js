module.exports = function stepService(store) {
  const service = {};

  service.get = (username) => {
    if (typeof store[username] === "function") return

    return store[username]
    
  }

  service.add = (username, ts, newSteps) => {
    const userExist = service.get(username)
    if (userExist) {
      store[username] = {
        ts: ts,
        cumulativeSteps: newSteps + userExist.cumulativeSteps
      }
    } else {
      store[username] = {
        ts: ts,
        cumulativeSteps: newSteps
      }
    }
    
  };

  return service;
};
