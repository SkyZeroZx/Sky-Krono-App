import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Type Error', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.intercept('GET', '/type', { fixture: 'type/list-type' }).as('getAllTypes');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate List Types Error', () => {
    cy.intercept('GET', '/type', { forceNetworkError: true }).as('getAllTypes');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.valiteToastText('tipos', 'Error al listar tipos');
  });

  it('Validate Delete Type Error', () => {
    cy.intercept('DELETE', '/type/*', { forceNetworkError: true }).as('deleteType');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteType');
    cy.valiteToastText('tipo', 'Sucedio un error al eliminar el tipo');
  });

  it('Validate Create New Type Inputs Message Restriction', () => {
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('#btn-new-type').click();
    cy.get('input[formControlName=description]').click();

    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=hours]',
    ).click();

    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    ).click();

    cy.get(
      'timepicker[formcontrolname=end]  > table > tbody > tr >  td >  input[aria-label=hours]',
    ).click();

    cy.get('input[formControlName=borderColor]').click();
    cy.get('input[formControlName=backgroundColor]').click();
    cy.get('input[formControlName=description]').click();
    cy.get('#required-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere descripción');
      });

    cy.get('#required-start')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere una hora inicio');
      });

    cy.get('#required-end')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere una hora de fin');
      });

    cy.get('#required-border')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere borde');
      });

    cy.get('#required-background')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere fondo');
      });

    cy.get('input[formControlName=description]').type('12');
    cy.get('#minLenght-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima es 5 caracteres');
      });

    // Type invalid range hour

    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('12');
    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('25');

    cy.get(
      'timepicker[formcontrolname=end]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('12');

    cy.get(
      'timepicker[formcontrolname=end]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('12');

    cy.get('input[formControlName=description]').click();
    cy.get('#invalid-range-hour')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Rango de horas no permitido');
      });
  });

  it('Validate Create New Type Error', () => {
    cy.intercept('POST', '/type', { forceNetworkError: true }).as('createType');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('#btn-new-type').click();
    // Type values in type timepicker
    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('00');

    cy.get(
      'timepicker[formcontrolname=start]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('00');

    cy.get(
      'timepicker[formcontrolname=end]  > table > tbody > tr >  td >  input[aria-label=minutes]',
    )
      .click()
      .type('00');

    cy.get(
      'timepicker[formcontrolname=end]  > table > tbody > tr >  td >  input[aria-label=hours]',
    )
      .click()
      .type('00');

    cy.get('input[formControlName=description]').type('Mock Description');
    cy.get('input[formControlName=backgroundColor]')
      .invoke('val', '#5e72e4')
      .trigger('input');
    cy.get('input[formControlName=borderColor]')
      .invoke('val', '#7a8cf8')
      .trigger('input');
    cy.get('input[formControlName=description]').click();
    cy.wait(500);
    cy.get('#btn-create-type').click({ force: true });
    cy.wait('@createType');
    cy.valiteToastText('tipo', 'Sucedio un error al registrar el nuevo tipo');
  });

  it('Vlidate Update Type Error', () => {
    cy.intercept('PATCH', '/type', { forceNetworkError: true }).as('updateType');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-type').click();
    cy.wait('@updateType');
    cy.valiteToastText('tipo', 'Sucedio un error al actualizar el tipo');
  });
});
