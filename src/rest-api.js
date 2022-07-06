const express = require('express');
const app = express();

module.exports = (stepService) => {
  const REST_PORT = 8080;

  app.get('/users/:username/steps', (req, res) => {
    const username = req.params.username
    const user = stepService.get(username)

    if (user) return res.status(200).json(user)
    return res.status(404).json({
      "error": "User doesn't exist"
    })
  })

  const server = app.listen(REST_PORT, () => {
    console.log("listening on ", REST_PORT);
  })

  return {
    close: () => server.close()
  }
};
