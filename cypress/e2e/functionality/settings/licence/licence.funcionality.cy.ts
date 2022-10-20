import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Licence Funcionality', () => {
  const { admin } = Cypress.env('users');
  const { dateInit, dateEnd } = Cypress.env('dateRange');

  beforeEach(() => {
    cy.intercept('GET', '/users').as('getAllUsers');
    cy.intercept('GET', '/licence').as('getAllLicence');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Create New Licence by User OK', () => {
    cy.intercept('POST', '/licence').as('createLicence');
    cy.get('button').contains('Permisos').click();
    cy.wait('@getAllLicence');
    cy.get('#btn-new-licence').click();
    cy.wait('@getAllUsers')

    cy.bsDatePickerSelectedRange('input[formControlName="dateRange"]', {
      dateInit,
      dateEnd,
    });
    cy.get('ng-select[formcontrolname=codUser]').type(`{enter}`);
    cy.get('input[formcontrolname=description]').type('Test E2E Licence');
    cy.get('#btn-create-licence').click();
    cy.wait('@createLicence');
    cy.valiteToastText('licencia', 'Se registro exitosamente la licencia');
  });

  it('Update Licence By User OK ', () => {
    cy.intercept('PATCH', '/licence').as('updateLicence');
    cy.get('button').contains('Permisos').click();
    cy.wait('@getAllLicence');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-licence').click();
    cy.wait('@updateLicence');
    cy.valiteToastText('licencia', 'Se actualizo la licencia exitosamente');
  });

  it('Delete Licence By User OK [MOCK]', () => {
    cy.intercept('GET', '/licence', { fixture: 'licence/list-licence' }).as(
      'getAllLicence',
    );
    cy.intercept('DELETE', '/licence/*', { fixture: 'response/response-ok' }).as(
      'deleteLicence',
    );
    cy.get('button').contains('Permisos').click();
    cy.wait('@getAllLicence');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteLicence');
    cy.valiteToastText('licencia', 'Se elimino exitosamente la licencia');
  });
});
