const express = require('express');
const Joi = require('@hapi/joi');
const WebSocket = require('ws');
const app = express();

module.exports = (stepService) => {
  const REST_PORT = 8080;

  app.get('/users/:username/steps', (req, res) => {
    const user = stepService.get(req.params.username)
    console.log("User", user);

    if (user === undefined) {
      return res.status(404).json({
        "error": "User doesn't exist"
      })
    }
    return res.status(200).json(user)
  })

  const ws = new WebSocket("ws://localhost:8081")
  ws.onopen = () => {
    console.log('Web socket opened.')
    const data = {
      update_id: (Date.now()).toString(),
      username: "kishy",
      ts: Date.now(),
      newSteps: 20
    }
    dataValidation.validateAsync(data).catch(e => {
      console.log(e)
      return
    })

    ws.send(JSON.stringify(data))

    ws.onclose = () => {
      console.log('Websocket closed.')
    }
  }

  const dataValidation = Joi.object({
    update_id: Joi.string().required(),
    username: Joi.string().required(),
    ts: Joi.number().required(),
    newSteps: Joi.number().required(),
  })

  const server = app.listen(REST_PORT, () => {
    console.log("listening on ", REST_PORT);
  })

  return {
    close: () => server.close((err) => {
      console.log('server closed')
      process.exit(err ? 1 : 0)
    })
  }
};
