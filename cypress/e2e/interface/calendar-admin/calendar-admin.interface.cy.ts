import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Calendar Admin Interface', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.login(admin.username, admin.password);
  });

  it.only('Validate Remove Task Error', () => {
    cy.intercept('GET', '/task', { fixture: '/task/list-task-admin' }).as('getTaskAdmin');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');
    cy.get('.fc-event-title').first().click();
  });
});
