import { generateRandomString, isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Chargue Error', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.intercept('GET', '/chargue').as('getAllChargues');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate List Chargue Error', () => {
    cy.intercept('GET', '/chargue', { forceNetworkError: true }).as('getAllChargues');
    cy.get('#btn-chargue').click();
    cy.wait('@getAllChargues');
    cy.valiteToastText('cargos', 'Sucedio un error al listar los cargos');
  });

  it('Create New Chargue Error', () => {
    cy.intercept('POST', '/chargue', { forceNetworkError: true }).as('createChargue');
    cy.get('#btn-chargue').click();
    cy.wait('@getAllChargues');
    cy.get('#btn-new-chargue').click();

    cy.get('input[formControlName="name"]').click().type(generateRandomString(10));
    cy.get('input[formControlName="description"]').click().type(generateRandomString(15));
    cy.get('#btn-create-chargue').click();
    cy.wait('@createChargue');
    cy.valiteToastText('cargo', 'Sucedio un error al registrar el cargo');
  });

  it('Delete Chargue Error', () => {
    cy.intercept('DELETE', '/chargue/*', { forceNetworkError: true }).as('deleteChargue');
    cy.get('#btn-chargue').click();
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteChargue');
    cy.valiteToastText('cargo', 'Sucedio un error al eliminar el cargo');
  });

  it('Update Chargue Error', () => {
    cy.intercept('PATCH', '/chargue', { forceNetworkError: true }).as('updateChargue');
    cy.get('#btn-chargue').click();
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-chargue').click();
    cy.wait('@updateChargue');
    cy.valiteToastText('cargo', 'Sucedio un error al actualizar el cargo');
  });

  it('Validate Create Chargue Message Error Inputs Restriction', () => {
    cy.get('#btn-chargue').click();
    cy.get('#btn-new-chargue').click();
    cy.get('input[formControlName="name"]').click();
    cy.get('input[formControlName="description"]').click();

    cy.get('input[formControlName="name"]').click();
    cy.get('#btn-create-chargue').should('be.disabled');

    cy.get('#required-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere nombre');
      });
    cy.get('#required-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere descripción');
      });
    cy.get('input[formControlName="name"]').type('a');
    cy.get('input[formControlName="description"]').type('a');

    cy.get('#minLenght-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima es 2 caracteres');
      });
    cy.get('#minLenght-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima es 2 caracteres');
      });
  });
});
