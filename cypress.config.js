const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 12000,
    responseTimeout: 12000,
    requestTimeout: 12000,
    video : true,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
