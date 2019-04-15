# Perfecto Reporting SDK for NodeJS projects
*The* solution for digital automation projects using NodeJS

# Usage
```javascript
perfectoReporting = require('perfecto-reporting')

perfectoExecutionContext = new perfectoReporting.Perfecto.PerfectoExecutionContext({
  webdriver,
  tags: ['optional tag']
});
reportingClient = new perfectoReporting.Perfecto.PerfectoReportingClient(perfectoExecutionContext);

reportingClient.testStart('This is the test name');

reportingClient.testStep('Navigate to my site');
webdriver.get('https://mysite.com');

reportingClient.testStep('Create new purchase order');
// Business logic executed via webdriver...

// Report the test status - either passed...
reportingClient.testStop({
  status: perfectoReporting.Constants.results.passed
});
// ... Or failed with an err
reportingClient.testStop({
  status: perfectoReporting.Constants.results.failed,
  message: err
});
```
