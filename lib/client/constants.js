/**
 * Reportium client constants
 */

const sdk = {
  /**
   * Custom env params for passing tags thru environment variables
   */
  jvmTagsParameterName: 'reportium-tags',

  /**
   * Custom env params for passing job name and number via environment variables
   */
  jobNumberParameterName: 'reportium-job-number',
  jobNameParameterName: 'reportium-job-name',

  /**
   * Custom env params for passing project name and version via environment variables
   */
  projectVersionParameterName: 'reportium-project-version',
  projectNameParameterName: 'reportium-project-name',
};

const capabilities = {
  executionReportUrl: 'testGridReportUrl'
};

const results = {
  passed: 'PASSED',
  failed: 'FAILED',
  unknown: 'UNKNOWN'
};

const constants = {
  sdk,
  capabilities,
  results
};

module.exports = constants;
