import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: true,
  env: {
    baseUrl: 'https://api-sky-krono.skyzerozx.com',
    service: {
      visit: 'http://localhost:4200',
      api: 'https://api-sky-krono.skyzerozx.com',
    },
    users: {
      admin: {
        username: 'skyzerobot64@gmail.com',
        password: 'Admin1',
        role: 'admin',
      },
      employee: {
        username: 'saivergx@gmail.com',
        password: 'Admin1',
        role: 'employee',
      },
      firstLogin: {
        username: 'mysqlserver64@gmail.com',
        password: 'PjjiN5UvZ9',
        role: 'admin',
      },
    },
  },
  e2e: {
    //   supportFile: 'cypress/support/commands.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
