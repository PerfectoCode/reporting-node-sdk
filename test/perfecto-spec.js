'use strict';

const webdriver = require('selenium-webdriver');
const Reporting = require('../index.js');

let perfectoExecutionContext;
let reportingClient;
let driver;

function setupDriver() {
  const user = 'user@perfectomobile.com';
  const password = 'password';
  const host = 'host.perfectomobile.com';

  const url = `https://${host}/nexperience/perfectomobile/wd/hub`;

  // Set capabilities
  const capabilities = {
    browserName: 'mobileOS',
    scriptName: 'testingGoogleImages',
    user,
    password,
    platformName: 'Android'
  };

  // Create new driver instance
  return new webdriver.Builder()
    .usingServer(url)
    .withCapabilities(capabilities)
    .build();
}

function log(message) {
  console.log(message);
}

// Test 1, search Google images for Selenium logo
async function testSearchImagesGoogleForSeleniumLogo() {
  log('Start test: testSearchImagesGoogleForSeleniumLogo');

  await reportingClient.testStart('Start test: testSearchImagesGoogleForSeleniumLogo', new Reporting.Perfecto.PerfectoTestContext(
    ['additionalTag'],
    [new Reporting.Model.CustomField('testIndex', '1')]
  ));

  // Step 1: Go to images.google.com
  await reportingClient.stepStart('Step 1: Go to images.google.com');
  const url = 'https://images.google.com/';
  await driver.get(url);
  await reportingClient.stepEnd('Step 1: Finished');

  // Step 2: validate the page has loaded by waiting for the images.google search edit field to load
  await reportingClient.stepStart(`Step 2: validate the page has loaded by
  waiting for the images.google search edit field to load`);
  const queryName = 'q';
  const text = 'Selenium Logo';

  await driver.wait(() => driver.findElement(webdriver.By.name(queryName)).isDisplayed(), 1500);
  await reportingClient.stepEnd('Step 2: Finished');

  // Step3: Validate the text 'images' appears in the URL
  await reportingClient.stepStart('Step3: Validate the text "images" appears in the URL');
  await driver.getCurrentUrl().then((currentUrl) => {
    return reportingClient.reportiumAssert(`Validate current url: ${url}`, currentUrl === url);
  });

  await reportingClient.stepEnd('Step 3: Finished');

  // Step 4: Enter the text 'Selenium Logo'
  await reportingClient.stepStart('Step 4: Enter the text "Selenium Logo"');
  await driver.findElement(webdriver.By.name(queryName)).sendKeys(text);
  await reportingClient.stepEnd('Step 4: Finished');

  // Step 5: Validate entered text and click on search icon
  await reportingClient.stepStart('Step 5: Validate entered text and click on search icon');
  const searchIconCss = '#main';
  await driver.findElement(webdriver.By.css(searchIconCss)).click();
  await reportingClient.stepEnd('Step 4: Finished');

  await reportingClient.testStop({
    status: Reporting.Constants.results.passed,
    // message: 'Simulating a failed test'
  });
}


function logReportUrl() {
  if (reportingClient) {
    // Output report URL to console
    reportingClient.getReportUrl()
      .then((url) => {
        log(`Report url ${url}`);
      });
  }
}

function tearDown() {
  // Cleanup driver
  if (driver) {
    driver.quit();
  }
  logReportUrl();
  log('Run Ended');
}


function setupReportingClient() {
  // Setup Perfecto reporting client
  perfectoExecutionContext = new Reporting.Perfecto.PerfectoExecutionContext({
    job: new Reporting.Model.Job({
      jobName: 'dailyTest',
      buildNumber: 9156,
      branch: 'master'
    }),
    project: new Reporting.Model.Project('reportingSdk', '1.0.0'),
    webdriver: driver,
    tags: ['javascript driver'],
    customFields: [new Reporting.Model.CustomField('framework', 'jasmine')]
  });
  reportingClient = new Reporting.Perfecto.PerfectoReportingClient(perfectoExecutionContext);
  console.log('Run started');
}

(async function () {
  driver = await setupDriver();
  setupReportingClient();

  logReportUrl();
  await testSearchImagesGoogleForSeleniumLogo();
  tearDown();
})();
