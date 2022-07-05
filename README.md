# Step Tracking Server

# Introduction
Imagine that your company is launching a fitness tracking wearable device. They need your team to develop a step tracking backend application that can do the following:
1. Maintain a user's cumulative step count through a stream of updates.
2. Provide an interface to retrieve the user's cumulative step count.

# Problem Statement:

1.  A **WebSocket-based API** in which the client can send a series of `update`s with the number of steps that were recently taken. Whenever the server receives a valid `update`, the user's step count should be updated to reflect the total number of steps taken up until that point in time. A valid `update` is a WebSocket message containing a JSON payload that has an `update_id` (string), a `username` (string), a `ts` (numerical timestamp) representing when the client sent the `update`, and the `newSteps` (number) recently taken. The server should ignore an `update` that isn't valid.

    The client will access your WebSocket server by opening a connection to `ws://localhost:8081`.

    Here's an example of an `update` that your server needs to handle:

    ```json
    {
      "update_id": "c0efd8a1-b3b8-49b7-92b1-69edc8bd6c0c",
      "username": "jenna",
      "ts": 1503031275211,
      "newSteps": 17
    }
    ```
  
2.  A **REST API** endpoint served to get the total number of steps taken by a user up until that point in time:

    **Request**  
    `GET http://localhost:8080/users/{username}/steps`

    Example: `GET http://localhost:8080/users/jenna/steps`

	  **Success Response**:  
	  **Code:** `200`  
	  **Body:** `{ "cumulativeSteps": 183, "ts": 1503031279439 }`  

	  `ts` represents the timestamp of the *most recent* valid `update` for a user from the client.

	  **Error Response**:  
	  **Code:** `404` (not found)  
	  **Body:** `{ "error": "User doesn't exist" }`  

## Your Task

Your task is to complete the Step Tracking application by implementing both the websocket API and the REST API endpoint described above. Write your code in the existing files to make the tests pass. Look for the `TODO` comments.

This is an initial prototype to be tested internally at the company, so you don't need to handle user authentication. Since we don't expect a lot of users now, we're using a simple in-memory `store` object to maintain state. Here is an example of the `store` at a given point in time:

```javascript
{
  jenna: {
    ts: 1503256778463,
    cumulativeSteps: 12323,
  },
  james: {
    ts: 1503256824767,
    cumulativeSteps: 587,
  },
}
```

You _should_ use the following npm package in your implementation of the WebSocket API:
- `ws` (https://www.npmjs.com/package/ws)

You *may* optionally use one of the following npm packages in your implementation of the REST API endpoint:
- `express` (https://www.npmjs.com/package/express)
- `koa` (https://www.npmjs.com/package/koa)
- `hapi` (https://www.npmjs.com/package/@hapi/hapi)
- `restify` (https://www.npmjs.com/package/restify)

You _should_ return object containing `close()` function (that shuts down the server) from both WebSocket API and REST API.

# Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests once (this will be used to evaluate your solutions)
3. `npm run test:watch` - run all tests in _watch mode_ (optionally, you can use it locally if you prefer)

## Good Luck!
