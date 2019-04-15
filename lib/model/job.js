'use strict';

module.exports = class Job {
  constructor(config, buildNumber) {
    if (typeof config === 'string') {
      console.warn('calling Job constructor(jobName, buildNumber) is deprecated, please pass config object');

      this.jobName = config;
      this.buildNumber = buildNumber;
      return this;
    }

    this.jobName = config.jobName;
    this.buildNumber = config.buildNumber;
    this.branch = config.branch;
  }
};
