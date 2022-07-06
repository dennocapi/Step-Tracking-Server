const request = require('request');

const testStore = require('./testStore');
const StepService = require('../src/step.service');
const RestAPI = require('../src/rest-api');

const baseURL = 'http://localhost:8080';

describe('Rest API', () => {
  let stepService;
  let restAPI;

  beforeEach((done) => {
    const store = testStore();
    stepService = StepService(store);
    restAPI = RestAPI(stepService);
    done();
  });

  afterEach((done) => {
    restAPI.close();
    done();
  });

  describe(`Getting an invalid user's step data`, () => {
    it('returns 404', (done) => {
      request.get(`${baseURL}/users/toString/steps`, (error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toEqual(404);
        done();
      });
    });

    it('returns 404 with expected payload', (done) => {
      request.get(`${baseURL}/users/nonexistentUser/steps`, (error, response) => {
        const jsonBody = JSON.parse(response.body);

        expect(response.statusCode).toEqual(404);
        expect(jsonBody.error).toEqual(`User doesn't exist`);
        done();
      });
    });
  });

  describe(`Getting a valid user's step data`, () => {
    it('returns 200 with expected step count', (done) => {
      request.get(`${baseURL}/users/jenna/steps`, (error, response) => {
        const jsonBody = JSON.parse(response.body);

        expect(jsonBody.cumulativeSteps).toEqual(12323);
        expect(jsonBody.ts).toEqual(1503256778463);
        done();
      });
    });
  });
});
