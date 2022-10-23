import { addVirtualAuthenticator } from '../../../helper/helper';

describe('Login Error', () => {
  const { visit } = Cypress.env('service');
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    localStorage.setItem('username', admin.username);
    localStorage.setItem('verified', 'true');
    cy.visit(visit);
  });

  it('Login Error Web Authentication', () => {
    addVirtualAuthenticator();
    cy.get('#btn-fingerprint').click();
    cy.valiteToastText('error', 'Sucedio un error al intentar autenticarse');
  });

  it('Login Error Web Authentication Network', () => {
    cy.intercept('POST', '/auth/generate-authentication-options', {
      forceNetworkError: true,
    }).as('generateAuthenticationOptions');
    cy.get('#btn-fingerprint').click();
    cy.wait('@generateAuthenticationOptions');
    cy.valiteToastText('error', 'Sucedio un error al intentar autenticarse');
  });

  it('Login Error Credentials Incorrrects', () => {
    cy.get('input[formControlName=username').clear().type(admin.username);
    cy.get('input[formControlName=password]').type('SomeThingWrong64@');
    cy.get('#btnLogin').click();
    cy.valiteToastText('Unauthorized', 'Unauthorized');
  });

  it('Login Error message inputs', () => {
    cy.get('input[formControlName=username').clear().type('notIsValidEmail');
    cy.get('input[formControlName=password]').type('req');
    cy.get('input[formControlName=username').click();
    cy.get('#validEmail')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Debe ingresar un Email valido');
      });
    cy.get('#minLenghtPass')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima es 6 caracteres');
      });
    cy.get('input[formControlName=username').clear();
    cy.get('input[formControlName=password').clear();
    cy.get('#requiredEmail')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar Email');
      });
    cy.get('#requiredPass')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar password');
      });
    cy.get('#btnLogin').should('be.visible').should('be.disabled').should('exist');
  });

  it('Login Network Error Mock', () => {
    cy.intercept('POST', '/auth/login', {
      forceNetworkError: true,
    }).as('login');
    cy.get('input[formControlName=username').clear().type(admin.username);
    cy.get('input[formControlName=password').type(admin.password);
    cy.get('#btnLogin').click();
    cy.valiteToastText('logearse', 'Error al logearse');
  });
});
