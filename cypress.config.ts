import { defineConfig } from 'cypress';
import { e2eConfig } from './cypress.e2e.config';
const { verifyDownloadTasks } = require('cy-verify-downloads');

export default defineConfig({
  ...e2eConfig,
  viewportHeight: 969,
  viewportWidth: 1669,
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      require('./cypress/plugins/index.ts').default(on, config);
      on('task', verifyDownloadTasks);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
