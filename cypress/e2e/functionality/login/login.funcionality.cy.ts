import { addVirtualAuthenticator, isMobile, optionsSwipe } from '../../../helper/helper';

describe('Login Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { admin, employee, firstLogin } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.intercept('auth/login').as('login');
  });

  it('Login Web Authentication', () => {
    cy.login(admin.username, admin.password);
    addVirtualAuthenticator();
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
    cy.get('button').contains('Perfil').click();
    cy.get('#userFingerPrint').click();
    cy.get('.swal2-confirm').click();
    // if (isMobile()) {
    //   cy.get('#btn-collapse').click();
    //   cy.get('.dropdown-toggle').click();
    // } else {
    //   cy.get('#dropdown-options').click();
    // }
    // cy.get(':nth-child(1) > .dropdown-item').click();
    // cy.get('#dropdown-options').click();     cy.get('a').contains('Log out').click();
    cy.get('#btn-logout').click();
    cy.get('.swal2-confirm').click();
    cy.get('#btn-fingerprint').click();
    cy.url().should('include', 'home');
  });

  it('Login with credentials - role admin', () => {
    cy.get('input[formControlName=username').clear().type(admin.username);
    cy.get('input[formControlName=password]').type(admin.password);
    cy.get('#btnLogin').should('be.visible').should('be.enabled').should('exist').click();
    cy.wait('@login');
    cy.url()
      .should('include', 'home')
      .then(() => {
        expect(JSON.parse(localStorage.getItem('user')).username).equals(admin.username);
        expect(JSON.parse(localStorage.getItem('user')).role).equals(admin.role);
      });
  });

  it('Login with credentials - role employee', () => {
    cy.get('input[formControlName=username').clear().type(employee.username);
    cy.get('input[formControlName=password]').type(employee.password);
    cy.get('#btnLogin').should('be.visible').should('be.enabled').should('exist').click();
    cy.wait('@login');
    cy.url()
      .should('include', 'home')
      .then(() => {
        expect(JSON.parse(localStorage.getItem('user')).username).equals(
          employee.username,
        );
        expect(JSON.parse(localStorage.getItem('user')).role).equals(employee.role);
      });
  });

  it('Login is FirstLogin of user , redirect to change password', () => {
    cy.login(firstLogin.username, firstLogin.password);
    cy.get('.swal2-confirm').click();
    cy.url().should('include', 'change-password');
  });

  it('Login is FirstLogin of user , and dismiss remove user of storage', () => {
    cy.login(firstLogin.username, firstLogin.password);
    cy.get('.swal2-cancel').click();
    cy.url()
      .should('include', 'login')
      .then(() => {
        expect(localStorage.getItem('user')).be.null;
      });
  });
});
