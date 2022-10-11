// Function for enabledVirtualAutehnticator API Low Level Chrome Debug
// More information: https://developer.chrome.com/docs/devtools/webauthn/
// https://github.com/cypress-io/cypress/issues/6991
// https://webauthn.guide/

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
