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
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { comparePixelmatch } from './diffs';
import { e2eConfig } from 'cypress.e2e.config';
const osName = os.platform(); // "darwin", "linux", "win32"

/**
 * Finds the good "master" image to compare the new image to.
 * @param {string} filename The new image filename
 */
const findBaseImage = (filename) => {
  console.log('findBaseImage');
  const baseFolder = e2eConfig.env.folderImagesChartsCompare;
  const justFilename = path.basename(filename);
  const platformSpecificBaseImage = path.join(baseFolder, osName, justFilename);
  if (fs.existsSync(platformSpecificBaseImage)) {
    return platformSpecificBaseImage;
  }
  // assume the image across all platforms looks the same
  const baseImage = path.join(baseFolder, justFilename);
  return baseImage;
};

export default (on, config) => {
  on('task', {
    async compare({ filename, options }) {
      console.log('Compare task ');
      console.log('My route is ', filename);
      if (!filename.endsWith('.png')) {
        const msg = `Expected image filename "${filename}" to end with .png`;
        console.error(msg);
        throw new Error(msg);
      }

      const baseImage = filename;

      const newImage = filename;
      const baseImageWithoutExtension = path.basename(
        e2eConfig.env.folderImagesChartsCompare + filename,
        '.png',
      );
      const diffImage = `${baseImageWithoutExtension}-diff.png`;

      console.log(
        'comparing base image %s to the new image %s, diff image %s',
        baseImage,
        newImage,
        diffImage,
      );

      const started = +new Date();
      const result = comparePixelmatch(
        baseImage,
        newImage,
        e2eConfig.env.folderImagesChartsCompare + 'diff/' + diffImage,
      );
      const finished = +new Date();
      const elapsed = finished - started;
      console.log('visual diff took %dms', elapsed);
      return result;
    },
  });
};
