import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Contacts Error', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
  });

  it('List Contact Error', () => {
    cy.intercept('GET', '/users', { forceNetworkError: true }).as('getUserError');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('contactos').click();
    cy.wait('@getUserError');
    cy.valiteToastText('contactos', 'Sucedio un error al listar los contactos');
  });
});
