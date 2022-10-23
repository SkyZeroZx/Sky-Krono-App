import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Calendar View Funcionality', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/task/user', { fixture: 'task/user' }).as('getTask');
  });

  it('Click in task by user logged ', () => {
    cy.intercept('GET', '/task/task_user/**', { fixture: 'task/task-user' }).as(
      'getUsersByTask',
    );
    cy.intercept('GET', '/type', { fixture: 'type/list-type' }).as('getTypes');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.get('.fc-event-title').first().click();
    cy.wait('@getTask');
    cy.wait('@getUsersByTask');
    cy.wait('@getTypes');
    cy.get('input[formControlName=title]')
      .invoke('val')
      .then((inputTitle) => {
        cy.fixture('task/user').then(([{ title }]) => {
          expect(inputTitle).equal(title);
        });
      });
    cy.get('input[formControlName=description]')
      .invoke('val')
      .then((inputDescription) => {
        cy.fixture('task/user').then(([{ description }]) => {
          expect(inputDescription).equal(description);
        });
      });
  });

  it('Close view task and reload task of task', () => {
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTask');
    cy.get('.fc-event-title').first().click();
    cy.get('.visually-hidden').click();
    cy.wait('@getTask');
  });
});
