const PerfectoReportingClient = require('./lib/perfecto-reporting-client');
const PerfectoExecutionContext = require('./lib/model/perfecto-execution-context');
const PerfectoTestContext = require('./lib/model/perfecto-test-context');

const Constants = require('./lib/client/constants');

const Job = require('./lib/model/job');
const CustomField = require('./lib/model/custom-field');
const Project = require('./lib/model/project');
const Platform = require('./lib/model/platform');
const MobileInfo = require('./lib/model/mobile-info');
const BrowserInfo = require('./lib/model/browser-info');
const TestExecutionResult = require('./lib/model/test-execution-result');

module.exports = {
  Perfecto: {
    PerfectoReportingClient,
    PerfectoTestContext,
    PerfectoExecutionContext
  },
  Constants,
  Model: {
    Job,
    Project,
    CustomField,
    Platform,
    MobileInfo,
    BrowserInfo,
    TestExecutionResult
  }
};

