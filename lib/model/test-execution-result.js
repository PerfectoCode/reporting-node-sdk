'use strict';

class TestExecutionResult {
  /**
   * config.status: String [PASSED, FAILED, UNKNOWN] // required, See Constants.results
   * config.message: String Error message if FAILED // optional
   */
  constructor(config) {
    this.status = config.status;
    this.message = config.message;
  }
}

module.exports = TestExecutionResult;
