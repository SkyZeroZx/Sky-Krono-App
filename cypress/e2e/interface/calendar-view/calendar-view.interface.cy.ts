import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Calendar View Interface', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
  });

  it('Validate Interface Detail Task', () => {
    cy.intercept('GET', '/task/user', { fixture: 'task/user' }).as('getTask');
    cy.intercept('GET', '/task/task_user/**', { fixture: 'task/task-user' }).as(
      'getUsersByTask',
    );
    cy.intercept('GET', '/type', { fixture: 'type/list-type' }).as('getTypes');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.get('.fc-timeGridWeek-button').should('be.visible');
    cy.get('.fc-timeGridDay-button').should('be.visible');
    cy.get('.fc-listWeek-button').should('be.visible');

    cy.get('.fc-event-title').first().click();
    cy.wait('@getTask');
    cy.wait('@getUsersByTask');
    cy.wait('@getTypes');

    cy.get('#lbl-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Titulo');
      });

    cy.get('#lbl-type')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Tipo');
      });

    cy.get('#lbl-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Descripcion');
      });

    cy.get('#lbl-date-range')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Rango Fechas');
      });

    cy.get('#lbl-users')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Usuarios');
      });

    cy.get('input[formControlName=title]').should('have.attr', 'readonly', 'readonly');
    cy.get('input[formControlName=description]').should(
      'have.attr',
      'readonly',
      'readonly',
    );

    cy.get('input[formControlName=dateRange]').should(
      'have.attr',
      'readonly',
      'readonly',
    );
  });
});
