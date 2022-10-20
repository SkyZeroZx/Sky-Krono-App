import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('User Profile Funcionality', () => {
  const { employee } = Cypress.env('users');
  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/users/profile', { fixture: '/users/profile/profile' }).as(
      'getProfile',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('perfil').click();
  });

  it('Validate switch dark/light theme', () => {
    cy.get('#userTheme')
      .click()
      .then(() => {
        cy.get('.col-md-12 > :nth-child(3)')
          .should('have.css', 'background-color')
          .and('eq', 'rgb(255, 255, 255)');

        cy.get('.col-md-12 > :nth-child(2)')
          .should('have.css', 'background-color')
          .and('eq', 'rgb(255, 255, 255)');
      });
    cy.get('#userTheme')
      .click()
      .then(() => {
        cy.get('.col-md-12 > :nth-child(2)')
          .should('have.css', 'background-color')
          .and('eq', 'rgb(39, 41, 61)');
        cy.get('.col-md-12 > :nth-child(3)')
          .should('have.css', 'background-color')
          .and('eq', 'rgb(39, 41, 61)');
      });
  });

  it('Validate enabled/disabled navbar', () => {
    cy.get('#userNavBar')
      .click()
      .then(() => {
        cy.get('.sidebar-wrapper').should('not.exist');
      });

    cy.get('#userNavBar')
      .click()
      .then(() => {
        cy.get('.sidebar-wrapper').should('be.visible').should('be.exist');
      });
  });

  it('Validate update user profile', () => {
    cy.intercept('PATCH', '/users').as('updateUser');
    cy.get('input[formControlName=name]').clear().type('Employee');
    cy.get('input[formControlName=fatherLastName]').clear().type('fatherLastName');
    cy.get('input[formControlName=motherLastName]').clear().type('motherLastName');
    cy.get('#btn-update-profile').click();
    cy.wait('@updateUser');
    cy.valiteToastText('perfil', 'Se actualizo exitosamente su perfil');
  });

  it('Validate logout user in profile', () => {
    cy.get('#btn-logout').click();
    cy.get('.swal2-confirm').click();
    cy.wait(500);
    cy.url()
      .should('include', 'login')
      .then(() => {
        expect(localStorage.getItem('user')).be.null;
      });
  });

  it.only('Validate upload new photo user profile', () => {
    cy.intercept('POST', '/users/photo', { fixture: 'response/response-ok' }).as(
      'uploadPhoto',
    );
    cy.get('input[type=file]').attachFile('upload/profile.jpg');
    cy.get('.swal2-confirm').click();
    cy.wait('@uploadPhoto');
    //   cy.valiteToastText('foto', 'Sucedio un error al subir su foto');
  });

  it('Validate navigate to change password', () => {
    cy.get('#btn-change-password').click();
    cy.url().should('include', 'change-password');
  });
});
