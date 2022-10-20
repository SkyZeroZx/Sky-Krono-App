import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Calendar View Funcionality', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
  });

  it('In list task in calendar error ', () => {
    cy.intercept('GET', '/task/user', { forceNetworkError: true }).as('getTask');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTask');
    cy.valiteToastText('tareas', 'Sucedio un error al listar las tareas');
  });

  it('Click in task and error in get users of task ', () => {
    cy.intercept('GET', '/task/user', { fixture: 'task/user' }).as('getTask');
    cy.intercept('GET', '/task/task_user/**', { forceNetworkError: true }).as(
      'getUsersByTask',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.get('.fc-event-title').first().click();
    cy.valiteToastText('usuarios', 'Error al listar usuarios por tarea');
    cy.wait('@getTask');
    cy.wait('@getUsersByTask');
  });

  it('Click in task and error in type of task', () => {
    cy.intercept('GET', '/task/user', { fixture: 'task/user' }).as('getTask');
    cy.intercept('GET', '/task/task_user/**', { forceNetworkError: true }).as(
      'getUsersByTask',
    );
    cy.intercept('GET', '/type', { forceNetworkError: true }).as('getTypes');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.get('.fc-event-title').first().click();
    cy.wait('@getTask');
    cy.wait('@getUsersByTask');
    cy.wait('@getTypes');
    cy.valiteToastText('Error', 'Error');
  });
});
