import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1600,
  viewportHeight: 900,
  retries: 	{ 'runMode': 0, 'openMode': 0 },
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: true,
  waitForAnimations: true,
  e2e: {
    baseUrl: 'http://localhost:5173/',
    experimentalRunAllSpecs: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: 'cypress/e2e/Auth/*',
    setupNodeEvents(on, config) {
    },
    env: {
      BASE_URL: 'http://localhost:5173/',
    }
  },
});
