export const e2eConfig = {
  projectId: 'rncrpx',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: true,
  experimentalStudio: true,
  waitForAnimations: true,
  defaultCommandTimeout: 40000,
  env: {
    mobileViewportWidthBreakpoint: 600,
    baseUrl: 'https://api-sky-krono.skyzerozx.com',
    service: {
      visit: 'http://localhost:4200',
      api: 'https://api-sky-krono.skyzerozx.com',
    },
    dateRange: {
      dateInit: '25',
      dateEnd: '27',
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
};
