/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require("fs");
const xlsx = require("node-xlsx").default;
const PDF = require("pdf-parse");
const path = require("path");
import * as registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default (on, config) => {
  on("task", {
    filesInDownload(folderName) {
      return fs.readdirSync(folderName);
    },
    parseXlsx(filePath) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    },
    parsePdf({ patch, fileName }) {
      const parsePdf = async (pdfName) => {
        const pdfPathname = path.join(patch, pdfName);
        let dataBuffer = fs.readFileSync(pdfPathname);
        return await PDF(dataBuffer); // use async/await since pdf returns a promise
      };
      return parsePdf(fileName);
      /*  return new Promise((resolve, reject) => {
        try {
         const jsonData = PDF.parse(fs.readFileSync(filePath));
          resolve(jsonData);
       
        } catch (e) {
          reject(e);
        }
      });*/
    },
  });
  return registerCodeCoverageTasks(on, config);
};
