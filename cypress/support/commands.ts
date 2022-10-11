/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.intercept('auth/login').as('login');
  cy.get('input[formControlName=username').clear().type(username);
  cy.get('input[formControlName=password]').type(password);
  cy.get('#btnLogin').click();
  cy.wait('@login');
});

Cypress.Commands.add('changePasswordNavigate', (username: string, password: string) => {
  cy.login(username, password);
  cy.get('#dropdown-options').click();
  cy.get(':nth-child(1) > .dropdown-item').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): any;
    changePasswordNavigate(username: string, password: string): any;
  }
}
