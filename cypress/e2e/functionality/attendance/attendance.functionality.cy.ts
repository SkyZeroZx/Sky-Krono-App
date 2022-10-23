import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Attendance Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/schedule/user', { fixture: 'schedule/user/schedule-entry' }).as(
      'scheduleEntry',
    );
  });

  it('Attedance Entry Register Ok', () => {
    cy.intercept('GET', '/attendance', {}).as('attendanceEntry');

    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }

    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@scheduleEntry');
    cy.wait('@attendanceEntry');
    cy.get('#title-attendance')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Asistencia');
      });

    cy.get('#btn-entry')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Entrada');
      });

    cy.get('#btn-entry').click();

    cy.intercept('GET', '/attendance', { fixture: 'attendance/attendance-exit' }).as(
      'attendanceExit',
    );
    cy.intercept('POST', '/attendance', { fixture: 'response/response-ok' }).as(
      'attendanceExit',
    );
    cy.get('.swal2-confirm').click();
    cy.wait('@attendanceExit');
    cy.get('#btn-entry').should('not.exist');
    cy.get('#btn-exit').should('be.visible');
  });

  it('Attedance Exit Register Ok', () => {
    cy.intercept('GET', '/attendance', { fixture: 'attendance/attendance-exit' }).as(
      'attendanceExit',
    );

    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }

    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@scheduleEntry');
    cy.wait('@attendanceExit');

    cy.get('#btn-exit').click();
    cy.intercept('PATCH', '/attendance', { fixture: 'response/response-ok' }).as(
      'registerExitAttendance',
    );
    cy.get('.swal2-confirm').click();
    cy.wait('@registerExitAttendance');

    cy.get('#btn-entry').should('not.exist');
    cy.get('#btn-exit').should('not.exist');
  });
});
