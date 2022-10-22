import { generateRandomString, isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Schedule Error', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.intercept('GET', '/schedule', { fixture: '/schedule/schedule-list' }).as(
      'getAllSchedule',
    );
    cy.intercept('PATCH', '/schedule', { forceNetworkError: true }).as('updateSchedule');
    cy.intercept('DELETE', '/schedule/*', { forceNetworkError: true }).as(
      'deleteSchedule',
    );
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('List Schedules Error', () => {
    cy.intercept('GET', '/schedule', { forceNetworkError: true }).as('getAllSchedule');
    cy.get('#btn-schedule').click();
    cy.wait('@getAllSchedule');
    cy.valiteToastText('schedules', 'Sucedio un error al listar los schedules');
  });

  it('Register Schedule ERROR', () => {
    cy.get('#btn-schedule').click();
    cy.wait('@getAllSchedule');
    cy.intercept('POST', '/schedule', { forceNetworkError: true }).as('createSchedule');
    cy.get('#btn-new-schedule').click();
    cy.get('[formControlName=name]').type('Mock' + generateRandomString(15));
    cy.get('[formControlName=description]').type('Mock' + generateRandomString(15));
    cy.get('[formControlName=toleranceTime]').type('5');
    cy.get(
      'timepicker[formcontrolname=entryHour]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('11');

    cy.get(
      'timepicker[formcontrolname=entryHour]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('11');

    cy.get(
      'timepicker[formcontrolname=exitHour]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('12');

    cy.get(
      'timepicker[formcontrolname=exitHour]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('12');

    cy.get('[formcontrolname="monday"]').click().click();

    cy.get('#btn-create-schedule').click();
    cy.wait('@createSchedule');
    cy.valiteToastText('horario', 'Sucedio un error al registrar el nuevo horario');
  });

  it('Update Schedule ERROR', () => {
    cy.get('#btn-schedule').click();
    cy.wait('@getAllSchedule');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-schedule').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText('horario', 'Sucedio un error al editar el horario');
  });

  it('Delete Schedule ERROR', () => {
    cy.get('#btn-schedule').click();
    cy.wait('@getAllSchedule');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteSchedule');
    cy.valiteToastText('horario', 'Sucedio un error al eliminar el horario');
  });

  it('Enabled/Disabled Notifications Schedule ERROR', () => {
    cy.get('#btn-schedule').click();
    cy.wait('@getAllSchedule');
    //Selected second element
    cy.get('.center.badge').eq(1).click();
    cy.get('.swal2-confirm').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText(
      'notificaciones',
      'Sucedio un error al actualizar las notificaciones',
    );
    cy.wait(4000);
    cy.get('.center.badge').eq(1).click();
    cy.get('.swal2-confirm').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText(
      'notificaciones',
      'Sucedio un error al actualizar las notificaciones',
    );
  });
});
