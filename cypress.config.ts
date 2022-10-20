import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'rncrpx',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: true,
  viewportHeight: 844,
  viewportWidth: 390,
  experimentalStudio: true,
  waitForAnimations : true,
  defaultCommandTimeout: 30000,
  env: {
    mobileViewportWidthBreakpoint: 600,
    baseUrl: 'https://api-sky-krono.skyzerozx.com',
    service: {
      visit: 'http://localhost:4200',
      api: 'https://api-sky-krono.skyzerozx.com',
    },
    dateRange: {
      dateInit: '21',
      dateEnd: '25',
    },
    users: {
      admin: {
        username: 'skyzerobot64@gmail.com',
        name: 'SkyBot',
        fatherLastName: 'paterno',
        motherLastName: 'materno',
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
      reset: {
        username: 'skyzerobot64CTesting@gmail.com',
      },
    },
  },
  e2e: {
    experimentalStudio: true,
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
