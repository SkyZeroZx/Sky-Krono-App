// @ts-check
/// <reference types="cypress" />
import { recurse } from 'cypress-recurse';
import { e2eConfig} from 'cypress.e2e.config'
export const downloadPng = (filename: string, selector: string, log: boolean = true) => {
  if (typeof filename !== 'string') {
    // trick: prints the argument to the assertion
    expect(filename).to.be.a('string');
  }

  cy.log('Preview a read canvas file');
  // the simplest way is to grab the data url and use
  // https://on.cypress.io/writefile to save PNG file
  return cy.get(selector, { log }).then(($canvas: JQuery<HTMLCanvasElement>) => {
    console.log('Read canvas', $canvas);
    const url = $canvas[0].toDataURL();
    const data = url.replace(/^data:image\/png;base64,/, '');
    // https://github.com/cypress-io/cypress/issues/15353
    // @ts-ignore
    cy.writeFile(filename, data, 'base64', { log });
    cy.wrap(filename, { log });
  });
};

export const downloadViaDataUrl = (
  name: string,
  selector: string,
  brickValue: string,
) => {
  const filename = brickValue ? `${name}-${brickValue}.png` : `${name}.png`;

  // the simplest way is to grab the data url and use
  // https://on.cypress.io/writefile to save PNG file
  return cy.get(selector).then(($canvas: JQuery<HTMLCanvasElement>) => {
    const url = $canvas[0].toDataURL();
    const data = url.replace(/^data:image\/png;base64,/, '');
    cy.writeFile(filename, data, 'base64');
    return cy.wrap(filename);
  });
};

// different ways of downloading the given canvas as an image
// the simplest seems to grab the canvas
// and use data url, then cy.writeFile(..., 'base64')

// TODO: see if we can directly use the binary cy.writeFile(..., 'binary')

export const downloadByClicking = (blob: Blob, name: string) => {
  console.log('downloading image', name);
  // blob ready, download it
  let link = document.createElement('a');
  link.download = name;

  link.href = URL.createObjectURL(blob);
  link.click();

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href);
};

export const looksTheSame = (filename: string, selector: string, log: boolean = true) => {
  filename = e2eConfig.env.folderImagesChartsCompare + filename
  cy.log(`looks the same **${filename}**?`);
  cy.then(() => {
    if (typeof filename === 'string') {
      expect(filename).to.be.a('string');
    }

    recurse(
      () => {
        return downloadPng(filename, selector, log).then((filename) => {
          if (log) {
            cy.log(`saved ${filename}`);
          }
          cy.task('compare', { filename }, { log }).then((result) => {
            console.log('My Result is ', result);
          });
          return cy.task('compare', { filename }, { log });
        });
      },
      ({ match }) => match,
      {
        log,
      },
    );
    cy.then(() => {
      cy.log(`**${filename}** looks the same`);
    });
  });
};
