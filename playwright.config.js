const { defineConfig, devices } = require('@playwright/test');

const environment = process.env.ECOMMERCE_TEST_ENV;
const configuredBaseURL = process.env.ECOMMERCE_QA_BASE_URL;
const publicReadOnly = environment === 'public-readonly';
const captureAllArtifacts = process.env.ECOMMERCE_CAPTURE_ALL === '1';

if (environment !== 'qa' && !publicReadOnly) {
  throw new Error('Set ECOMMERCE_TEST_ENV to qa or public-readonly before running tests.');
}

if (!configuredBaseURL) {
  throw new Error('Set ECOMMERCE_QA_BASE_URL to the explicitly approved QA URL.');
}

let parsedBaseURL;
try {
  parsedBaseURL = new URL(configuredBaseURL);
} catch {
  throw new Error('ECOMMERCE_QA_BASE_URL must be a valid absolute URL.');
}

if (!['http:', 'https:'].includes(parsedBaseURL.protocol)) {
  throw new Error('ECOMMERCE_QA_BASE_URL must use HTTP or HTTPS.');
}

if (parsedBaseURL.search || parsedBaseURL.hash) {
  throw new Error('ECOMMERCE_QA_BASE_URL must not include a query string or fragment.');
}

if (!parsedBaseURL.pathname.endsWith('/')) {
  parsedBaseURL.pathname += '/';
}

module.exports = defineConfig({
  testDir: './tests',
  ...(publicReadOnly ? { testMatch: ['login-ui.spec.js'] } : {}),
  timeout: publicReadOnly ? 60000 : 30000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: parsedBaseURL.toString(),
    trace: captureAllArtifacts ? 'on' : 'retain-on-failure',
    screenshot: captureAllArtifacts ? 'on' : 'only-on-failure',
    video: captureAllArtifacts ? 'on' : 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});