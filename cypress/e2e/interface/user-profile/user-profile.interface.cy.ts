import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('User Profile Interface', () => {
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

  it('Validate interface user profile', () => {
    cy.wait('@getProfile');
    cy.wait(2000);
    cy.get('#full-name')
      .invoke('text')
      .then((text) => {
        cy.fixture('users/profile/profile').then(
          ({ name, fatherLastName, motherLastName }) => {
            expect(text.trim()).to.equal(`${name} ${fatherLastName} ${motherLastName}`);
          },
        );
      });

    cy.get('#options')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Opciones');
      });

    cy.get('#lbl-theme')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Theme');
      });

    cy.get('#lbl-navBar')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Nav Bar');
      });

    cy.get('#lbl-notifications')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Notificaciones');
      });

    cy.get('#btn-update-profile')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Actualizar');
      });

    cy.get('#btn-logout')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Logout');
      });

    cy.get('#btn-change-password')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Cambiar Contraseña');
      });
  });
});
