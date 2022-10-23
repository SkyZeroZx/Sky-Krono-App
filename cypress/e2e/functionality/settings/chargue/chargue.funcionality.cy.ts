import { generateRandomString, isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Chargue Funcionality', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.intercept('GET', '/chargue').as('getAllChargues');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Create New Chargue OK', () => {
    cy.intercept('POST', '/chargue').as('createChargue');
    cy.get('#btn-chargue').click();
    cy.wait('@getAllChargues');
    cy.get('#btn-new-chargue').click();

    cy.get('input[formControlName="name"]').type(generateRandomString(15));
    cy.get('input[formControlName="description"]').type(generateRandomString(15));
    cy.get('#btn-create-chargue').click();
    cy.wait('@createChargue');
    cy.valiteToastText('cargo', 'El nuevo cargo se registro exitosamente');
  });

  it('Delete Chargue OK', () => {
    cy.intercept('DELETE', '/chargue/*', { fixture: 'response/response-ok' }).as(
      'deleteChargue',
    );
    cy.get('#btn-chargue').click();
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteChargue');
    cy.valiteToastText('cargo', 'Se elimino exitosamente el cargo');
  });

  it('Update Chargue OK', () => {
    cy.intercept('PATCH', '/chargue').as('updateChargue');
    cy.get('#btn-chargue').click();
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-chargue').click();
    cy.wait('@updateChargue');
    cy.valiteToastText('cargo', 'El nuevo cargo se actualizo exitosamente');
  });
});
