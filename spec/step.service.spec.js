const testStore = require('./testStore');
const StepService = require('../src/step.service');

const builtinProps = Object.getOwnPropertyNames(Object.prototype).sort();

describe('Step Service', () => {
  let store;
  let stepService;

  beforeEach((done) => {
    store = testStore();
    stepService = StepService(store);
    done();
  });

  describe('Getting user', () => {
    it('returns step data for existing user', () => {
      expect(stepService.get('james')).toEqual(store.james);
    });

    it('returns undefined for nonexistent user', () => {
      expect(stepService.get('sasha')).toEqual(undefined);

      const randomBuiltinProp = builtinProps[x = (Math.random() * builtinProps.length) | 0];
      expect(stepService.get(randomBuiltinProp)).toEqual(undefined);
    });
  })

  describe('Adding 5 steps', () => {
    it('is successful when user already exists', () => {
      stepService.add('jenna', Date.now(), 5);

      expect(stepService.get('jenna').cumulativeSteps).toEqual(12323 + 5);
    });

    it(`is successful when user didn't previously exist`, () => {
      stepService.add('tommy', Date.now(), 5);

      expect(stepService.get('tommy').cumulativeSteps).toEqual(5);
    });
  });
});
