import { compare } from 'odiff-bin';
import * as fs from 'fs';
import { PNG } from 'pngjs';
import * as pixelmatch from 'pixelmatch';
import { e2eConfig } from 'cypress.e2e.config';

export const compareOdiff = async (
  baseImage: string,
  newImage: string,
  diffImage: string,
  options: any,
) => {
  if (options) {
    console.log('odiff options %o', options);
  }

  const result = await compare(baseImage, newImage, diffImage, options);

  console.log(result);
  return result;
};

export const comparePixelmatch = (
  baseImage: string,
  newImage: string,
  diffImage: string,
) => {
  // load the new image first - because the base image might not exist yet
  const img2 = PNG.sync.read(fs.readFileSync(newImage));
  console.log('new image %s has resolution %o', newImage, {
    width: img2.width,
    height: img2.height,
  });

  const img1 = PNG.sync.read(fs.readFileSync(baseImage));
  console.log('base image %s has resolution %o', baseImage, {
    width: img1.width,
    height: img1.height,
  });

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const n = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: e2eConfig.env.pixelmatchThreshold,
  });

  fs.writeFileSync(diffImage, PNG.sync.write(diff));
  console.log('pixelmatch %d diff pixels', n);

  return {
    match: n === 0,
    pixelmatch: n,
    diff: diff,
  };
};
