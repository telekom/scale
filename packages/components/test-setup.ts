const mutationObserverMock = jest.fn(function MutationObserver(callback) {
  this.observe = jest.fn();
  this.disconnect = jest.fn();
  // // Optionally add a trigger() method to manually trigger a change
  this.trigger = (mockedMutationsList) => {
    callback(mockedMutationsList, this);
  };
});

// Mock the global MutationObserver object
global.MutationObserver = mutationObserverMock as jest.Mock;
