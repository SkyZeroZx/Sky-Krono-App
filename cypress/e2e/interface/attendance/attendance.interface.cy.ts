import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Attendance Funcionality', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('/schedule/user', { fixture: 'schedule/user/schedule-entry' }).as(
      'scheduleEntry',
    );
  });

  it('Validate Attendance Day Valid - Entry', () => {
    cy.intercept('/attendance', {}).as('attendanceEntry');
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

    cy.get('.swal2-textarea')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Escribe alguna nota ...');

    cy.get('.swal2-confirm')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Registrar');
      });

    cy.get('.swal2-cancel')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Cancelar');
      });
  });

  it('Validate Attendance Day Valid - Exit', () => {
    cy.intercept('GET', '/attendance', { fixture: 'attendance/attendance-exit' }).as(
      'attendanceExit',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@scheduleEntry');
    cy.wait('@attendanceExit');

    cy.get('#btn-exit')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Salida');
      });

    cy.get('#btn-exit').click();

    cy.get('.swal2-confirm')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Salir');
      });

    cy.get('#swal2-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('¿Está seguro que desea salir?');
      });

    cy.get('#swal2-html-container')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Esta acción no se puede revertir');
      });

    cy.get('.swal2-cancel')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Cancelar');
      });
  });

  it('Validate Attendance Day Not Valid', () => {
    cy.intercept('/schedule/user', {
      fixture: 'schedule/user/schedule-day-not-valid',
    }).as('scheduleDayNotValid');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('asistencia').click();
    cy.wait('@scheduleDayNotValid');
    cy.get('#title-day-not-valid')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Hoy no trabajas');
      });
  });
});
