'use strict';

const Constants = require('./client/constants');

const START_TEST_COMMAND = 'mobile:test:start';
const TEST_STEP_COMMAND = 'mobile:test:step';
const START_STEP_COMMAND = 'mobile:step:start';
const END_STEP_COMMAND = 'mobile:step:end';
const END_TEST_COMMAND = 'mobile:test:end';
const ASSERT_COMMAND = 'mobile:status:assert';

class PerfectoReportiumClient {
  /**
   * Creates a new instance
   * @param perfectoExecutionContext  Test execution context details
   */
  constructor(perfectoExecutionContext) {
    this.perfectoExecutionContext = perfectoExecutionContext;

    /**
     * Execute perfecto command
     * @param command
     * @param params
     * @returns {promise.Promise.<T>}
     */
    const executeScript = (command, params) => {
      return this.perfectoExecutionContext.webdriver.executeScript(command, params);
    };

    const combineTags = (tags) => {
      let combinedTags = this.perfectoExecutionContext.tags || [];
      combinedTags = combinedTags.concat(tags || [])
        .filter((tag) => {
          const isString = typeof tag === 'string';

          if (!!tag && isString) {
            return true;
          }

          throw new Error('none textual tags or empty tags are not supported and filtered out');
        }); // we don't want to send undefined as tag


      return Array.from(new Set(combinedTags)); // remove duplicated tags
    };

    const combineCustomFields = (customFields) => {
      let combinedFields = this.perfectoExecutionContext.customFields || [];
      combinedFields = new Map(combinedFields.map(field => field.toMapItem()));

      // remove duplicated fields
      (customFields || []).forEach(field => combinedFields.set(field.name, field));

      return Array.from(combinedFields.values())
        .map(field => field.toString());
    };

    const setTestContext = (params, testContext) => { /* eslint-disable no-param-reassign */
      if (!testContext) {
        params.tags = combineTags();
        params.customFields = combineCustomFields();
        return;
      }

      if (testContext instanceof Array || typeof testContext === 'string') { // backward compatible support
        console.warn('testStart(testName, tags) is deprecated. please use testStart(testName, PerfectoTestContext)');

        params.tags = combineTags(testContext);
        params.customFields = combineCustomFields();
        return;
      }

      params.tags = combineTags(testContext.tags);
      params.customFields = combineCustomFields(testContext.customFields);
    };

    /**
     * Start a new functional test.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @param testName - String
     * @param testContext - PerfectoTestContext - test context contain tags and customFields
     * @return promise.Promise.<T>
     */
    this.testStart = (testName, testContext) => {
      // Send test-start command
      const params = {
        name: testName
      };
      if (this.perfectoExecutionContext.job) {
        params.jobName = this.perfectoExecutionContext.job.jobName;
        params.jobNumber = this.perfectoExecutionContext.job.buildNumber;
        params.jobBranch = this.perfectoExecutionContext.job.branch;
      }
      if (this.perfectoExecutionContext.project) {
        params.projectName = this.perfectoExecutionContext.project.projectName;
        params.projectVersion = this.perfectoExecutionContext.project.projectVersion;
      }
      // Combine execution context with testContext
      setTestContext(params, testContext);

      return executeScript(START_TEST_COMMAND, params);
    };

    /**
     * Report a new test step in the context of the last started test.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @deprecated Since 1.2.1
     * @param description String
     * @return promise.Promise.<T>
     */
    this.testStep = (description) => {
      console.warn('testStep method is deprecated, use stepStart and stepEnd instead');
      const params = {name: description};
      return executeScript(TEST_STEP_COMMAND, params);
    };

    /**
     * Report a new test step in the context of the last started test.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @param description String
     * @param callback
     * @return promise.Promise.<T>
     */
    this.stepStart = (description) => {
      const params = {name: description};
      return executeScript(START_STEP_COMMAND, params);
    };

    /**
     * Report an ending of test step in the context of the last started test.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @param message String
     * @param callback
     * @return promise.Promise.<T>
     */
    this.stepEnd = (message = null) => {
      const params = {message};
      return executeScript(END_STEP_COMMAND, params);
    };

    /**
     * End a test exeuction and report its completion status.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @param testResult - TestExectionResult type, see test-execution-result.js
     * @param testContext - PerfectoTestContext - test context contain tags and customFields
     * @return promise.Promise.<T>
     */
    this.testStop = (testResult, testContext) => {
      const params = {
        success: testResult.status === Constants.results.passed
      };

      if (testResult.message) {
        params.failureDescription = testResult.message;
      }

      if (testResult.failureReason) {
        params.failureReason = testResult.failureReason;
      }

      if (testContext) {
        setTestContext(params, testContext);
      }

      return executeScript(END_TEST_COMMAND, params);
    };

    /**
     * Report about an assertion with costumize message and it's status.
     *
     * This method performs an executeScript command that is executed as part
     * of the WebDriverJS control flow
     *
     * @param message String
     * @param status Boolean
     * @return promise.Promise.<T>
     */
    this.reportiumAssert = (message, status) => {
      const params = { message, status };

      if (typeof status !== 'boolean') {
        throw new Error('reportiumAssert - invalid type of status parameter (should be Boolean)');
      }

      return executeScript(ASSERT_COMMAND, params);
    };

    /**
     * Returns a promise which resolves to the report URL
     */
    this.getReportUrl = () =>
      this.perfectoExecutionContext.webdriver.getCapabilities()
        .then(caps => caps.get(Constants.capabilities.executionReportUrl));
  }

}

module.exports = PerfectoReportiumClient;
