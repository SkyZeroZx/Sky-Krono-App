/// <reference types="cypress" />

const helper = require('../helper/helper');
interface DateRange {
  dateInit: string;
  dateEnd: string;
}
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
  const { visit } = Cypress.env('service');
  cy.visit(visit);
  cy.intercept('auth/login').as('login');
  cy.get('input[formControlName=username').clear().type(username);
  cy.get('input[formControlName=password]').type(password);
  cy.get('#btnLogin').click();
  cy.wait('@login');
});

Cypress.Commands.add('changePasswordNavigate', (username: string, password: string) => {
  cy.login(username, password);
  if (helper.isMobile()) {
    cy.get('#btn-collapse').click();
    cy.get('.dropdown-toggle').click();
  } else {
    cy.get('#dropdown-options').click();
  }
  cy.get(':nth-child(1) > .dropdown-item').click();
});

Cypress.Commands.add(
  'bsDatePickerSelectedRange',
  (element: string, { dateInit, dateEnd }: DateRange) => {
    cy.get(element).click({
      force: true,
    });
    // Select Date Range BsDatePicker
    cy.get('div.bs-datepicker-body > table > tbody > tr  > td > span')
      .not('.disabled')
      .contains(dateInit)
      .first()
      .click({ force: true });
    cy.get('div.bs-datepicker-body > table > tbody > tr  > td > span')
      .not('.disabled')
      .contains(dateInit)
      .first()
      .click({ force: true });
    cy.get('div.bs-datepicker-body > table > tbody > tr  > td > span')
      .not('.disabled')
      .contains(dateEnd)
      .first()
      .click({ force: true });
    cy.get('div.bs-datepicker-body > table > tbody > tr  > td > span')
      .not('.disabled')
      .contains(dateEnd)
      .first()
      .click({ force: true });
  },
);

Cypress.Commands.add('valiteToastText', (contains: string, text: string) => {
  cy.get('#toast-container')
    .find('div')
    .find('div')
    .contains(contains)
    .invoke('text')
    .then((res) => {
      expect(res.trim()).to.contains(text);
    });
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
    valiteToastText(contains: string, text: string): any;
    bsDatePickerSelectedRange(element: string, dateRange: DateRange): any;
  }
}
