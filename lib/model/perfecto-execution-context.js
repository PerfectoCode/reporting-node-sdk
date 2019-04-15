'use strict';

module.exports = class PerfectoExecutionContext {
  /**
   * Create a new execution context for tests running with Perfecto
   *
   * @param config - Object of type
   * {
   *  webdriver: WebDriver (required) - WebDriver driving the test
   *  job: Job (optional) - Job details
   *  project: Project (optional) - Project details
   *  customFields: CustomField[] (optional) - list of custom fields
   *  tags: String[] (optional) - Free form tags that will be attached to all test executions
   *                              executed by this driver
   * }
   */
  constructor(config) {
    this.webdriver = config.webdriver;
    this.job = config.job;
    this.project = config.project;
    this.tags = [].concat(config.tags || []); // to support undefined, string and array
    this.customFields = config.customFields;
  }
};

