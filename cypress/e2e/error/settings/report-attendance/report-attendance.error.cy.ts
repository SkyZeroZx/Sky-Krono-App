import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Report Attendance Error', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
    cy.get('#btn-reports-attendance').click();
  });

  it('Validate List Attendance ERROR', () => {
    cy.intercept('POST', '/attendance/report', { forceNetworkError: true }).as(
      'getAttendanceReport',
    );
    cy.bsDatePickerSelectedRange('input[formControlName="dateRange"]', {
      dateEnd: '25',
      dateInit: '10',
    });
    cy.get('ng-select[formcontrolname=id]').type(`${admin.name}{enter}`);
    cy.wait('@getAttendanceReport');
    cy.valiteToastText('asistencias', 'Sucedio un error al listar asistencias');
  });
});
