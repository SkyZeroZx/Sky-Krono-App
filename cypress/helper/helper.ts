// Function for enabledVirtualAutehnticator API Low Level Chrome Debug
// More information: https://developer.chrome.com/docs/devtools/webauthn/
// https://github.com/cypress-io/cypress/issues/6991
// https://webauthn.guide/

import { RealSwipeOptions } from 'cypress-real-events/commands/realSwipe';

/**
 * It enables the WebAuthn protocol, then adds a virtual authenticator to the browser
 * @returns The authenticatorId is being returned.
 */
export function addVirtualAuthenticator() {
  return Cypress.automation('remote:debugger:protocol', {
    command: 'WebAuthn.enable',
    params: {},
  }).then((result) => {
    console.log('WebAuthn.enable', result);
    return Cypress.automation('remote:debugger:protocol', {
      command: 'WebAuthn.addVirtualAuthenticator',
      params: {
        options: {
          protocol: 'ctap2',
          transport: 'internal',
          hasResidentKey: true,
          hasUserVerification: true,
          isUserVerified: true,
        },
      },
    }).then((result) => {
      console.log('WebAuthn.addVirtualAuthenticator', result);
      return result.authenticatorId;
    });
  });
}

// Cypress.automation('remote:debugger:protocol', {
//   command: 'Emulation.setTouchEmulationEnabled',
//   params: {
//     enabled: true,
//   },
// });
/*  Object.defineProperty(win.navigator, 'userAgent', {
          value:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        });
*/

/**
 * It returns a random string of a given length
 * @param {number} num - number - The number of characters you want the string to be.
 * @returns A random string of length num.
 */
export function generateRandomString(num: number): string {
  var arr = new Uint8Array((num || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

/**
 * It takes a string of numbers, and returns a string of numbers separated by dashes.
 * @param value - The value of the input field.
 * @returns A function that takes a value and returns a string.
 */
export function formatPhoneContacts(value): string {
  return `${value.slice(0, 3)} - ${value.slice(3, 6)} - ${value.slice(6, 9)}`;
}

/**
 * It returns true if the viewport width is less than the mobile viewport width breakpoint
 * @returns A boolean value.
 */
export const isMobile = () => {
  const isMobile =
    Cypress.config('viewportWidth') < Cypress.env('mobileViewportWidthBreakpoint');

  if (isMobile) {
    cy.wait(1200);
  }

  return isMobile;
};

/* A swipe option for the cy.realSwipe() command. */
export const optionsSwipe: RealSwipeOptions = {
  x: 150,
  y: 150,
  touchPosition: 'center',
  length: 500,
};
