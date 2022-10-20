import { generateRandomString, isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Type Funcionality', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.intercept('GET', '/type', { fixture: 'type/list-type' }).as('getAllTypes');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate Create New Type OK', () => {
    cy.intercept('POST', '/type').as('createType');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('#btn-new-type').click();

    // Type values in type timepicker
    cy.get(
      '.hour > .ng-untouched > table > tbody > :nth-child(2) > :nth-child(1) > .form-control',
    ).type('00');
    cy.get(
      '.hour > .ng-untouched > table > tbody > :nth-child(2) > .form-group.ng-star-inserted > .form-control',
    ).type('00');

    cy.get(
      ':nth-child(2) > .ng-untouched > table > tbody > :nth-child(2) > :nth-child(1) > .form-control',
    ).type('12');

    cy.get(
      ':nth-child(2) > .ng-untouched > table > tbody > :nth-child(2) > .form-group.ng-star-inserted > .form-control',
    ).type('12');

    cy.get('input[formControlName=description]').type('Mock'+generateRandomString(15));
    cy.get('input[formControlName=backgroundColor]')
      .invoke('val', '#5e72e4')
      .trigger('input');
    cy.get('input[formControlName=borderColor]')
      .invoke('val', '#7a8cf8')
      .trigger('input');
    cy.get('input[formControlName=description]').click({ force: true });
    cy.wait(1000)
    cy.get('#btn-create-type').click({ force: true });
    cy.wait('@createType');
    cy.valiteToastText('tipo', 'Se registro exitosamente el nuevo tipo');
  });

  it('Validate Update Type OK', () => {
    cy.intercept('PATCH', '/type', { fixture: 'response/response-ok' }).as('updateType');
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-type').click();
    cy.wait('@updateType');
    cy.valiteToastText('tipo', 'Se actualizo exitosamente el tipo');
  });

  it('Validate Delete Type OK', () => {
    cy.intercept('DELETE', '/type/*', { fixture: 'response/response-ok' }).as(
      'deleteType',
    );
    cy.get('#btn-types').click();
    cy.wait('@getAllTypes');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteType');
    cy.valiteToastText('tipo', 'Se elimino exitosamente el tipo');
  });
});
