import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Attendance Error', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/schedule/user', { fixture: 'schedule/user/schedule-entry' }).as(
      'scheduleEntry',
    );
  });

  it('Attendance Get Schedule Error', () => {
    cy.intercept('GET', '/schedule/user', { forceNetworkError: true }).as(
      'getScheduleError',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@getScheduleError');
    cy.valiteToastText('horario', 'Sucedio un error al obtener el horario');
  });

  it('Attendance Get Attendance Error', () => {
    cy.intercept('GET', '/attendance', { forceNetworkError: true }).as(
      'getAttendanceError',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@scheduleEntry');
    cy.wait('@getAttendanceError');
    cy.valiteToastText('asistencia', 'Sucedio un error al obtener la asistencia');
  });

  it('Attedance Entry Register ERROR', () => {
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
    cy.intercept('POST', '/attendance', { forceNetworkError: true }).as(
      'registerEntryAttendance',
    );
    cy.get('.swal2-confirm').click();
    cy.wait('@registerEntryAttendance');
    cy.valiteToastText('entrada', 'Sucedio un error al registrar su entrada');
    cy.get('#btn-entry').should('be.visible');
    cy.get('#btn-exit').should('not.exist');
  });

  it('Attedance Exit Register ERROR', () => {
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

    cy.intercept('PATCH', '/attendance', { forceNetworkError: true }).as(
      'registerExitAttendance',
    );
    cy.get('.swal2-confirm').click();
    cy.wait('@registerExitAttendance');
    cy.valiteToastText('salida', 'Sucedio un error al registrar su salida');
    cy.get('#btn-entry').should('not.exist');
    cy.get('#btn-exit').should('be.visible');
  });
});
