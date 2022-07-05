const WebSocket = require('ws');

const testStore = require('./testStore');
const StepService = require('../src/step.service');
const wsServerAPI = require('../src/wsServer-api');

const baseURL = 'ws://localhost:8081';

describe('WebSocket API', () => {
  let stepService;
  let ws;
  let wsServer;

  beforeEach((done) => {
    const store = testStore();
    stepService = StepService(store);
    wsServer = wsServerAPI(stepService);

    ws = new WebSocket(`${baseURL}`);
    wsServer.on('listening', () => {
        done();
    });
  });

  afterEach((done) => {
    ws.close();
    wsServer.close();
    done();
  });

  describe('Opening a websocket connection to the server', () => {
    it('successfully establishes a connection', (done) => {
      ws.on('open', () => {
        expect(ws).toBeTruthy();
        done();
      });
    });
  });

  describe('Sending an update for an existing user', () => {
    it(`properly updates the user's step count`, (done) => {
      ws.on('open', () => {
        const update = {
          update_id: 'c0efd8a1-b3b8-49b7-92b1-69edc8bd6c0c',
          username: 'jenna',
          ts: 1503270344121,
          newSteps: 11,
        };

        ws.send(JSON.stringify(update), (err) => {
          setTimeout(() => {
            expect(err).toBeFalsy();
            expect(stepService.get('jenna').cumulativeSteps).toEqual(12323 + 11);
            done();
          }, 50); // wait 500ms for server to persist the data before verifying
        });
      });
    });
  });
});
