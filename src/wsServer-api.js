const WebSocketServer = require('ws').Server;
const Joi = require('@hapi/joi');

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({
    port: WEBSOCKET_PORT
  });

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.

  wsServer.on("connection", ws => {
    console.log("New client connected");
    ws.on("message", (data) => {
      const update = JSON.parse(data)
      dataValidation.validateAsync(update).catch((err) => {
        console.log(err)
        return
      });
      stepService.add(update.username, update.ts, update.newSteps)
      const user = stepService.get(update.username)
    });

    ws.on("close", () => {
      console.log("The client has connected");
    });

    ws.onerror = function () {
      console.log("Some Error occurred")
    }
  });

  const dataValidation = Joi.object({
    update_id: Joi.string().required(),
    username: Joi.string().required(),
    ts: Joi.number().required(),
    newSteps: Joi.number().required(),
  })

  return wsServer;
}
