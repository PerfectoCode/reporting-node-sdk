'use strict';

module.exports = class PerfectoTestContext {
  /**
   * Create a new test context for existing execution running with Perfecto
   *
   *  @param customFields: CustomField[] (optional) - list of custom fields
   *  @param tags: String[] (optional) - Free form tags that will be attached to all test executions
   *                              executed by this driver
   */
  constructor(tags, customFields) {
    this.tags = tags;
    this.customFields = customFields;
  }
};
