import { generateRandomString, isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Schedule Funcionality', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
    cy.get('#btn-schedule').click();
  });

  it('Register Schedule OK', () => {
    cy.intercept('POST', '/schedule').as('createSchedule');
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
    cy.valiteToastText('horario', 'Se registro exitosamente el nuevo horario');
  });

  it('Update Schedule OK', () => {
    cy.intercept('PATCH', '/schedule').as('updateSchedule');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-schedule').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText('horario', 'Se actualizo exitosamente el horario');
  });

  it('Delete Schedule OK', () => {
    cy.intercept('DELETE', '/schedule/*', { fixture: 'response/response-ok' }).as(
      'deleteSchedule',
    );
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteSchedule');
    cy.valiteToastText('horario', 'Se elimino exitosamente el horario');
  });

  it('Enabled/Disabled Notifications Schedule OK', () => {
    cy.intercept('PATCH', '/schedule').as('updateSchedule');
    //Selected second element
    cy.get('.center.badge').eq(1).click();
    cy.get('.swal2-confirm').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText('horario', 'Se actualizaron las notificaciones para el horario');
    cy.wait(4000);
    cy.get('.center.badge').eq(1).click();
    cy.get('.swal2-confirm').click();
    cy.wait('@updateSchedule');
    cy.valiteToastText('horario', 'Se actualizaron las notificaciones para el horario');
  });
});
