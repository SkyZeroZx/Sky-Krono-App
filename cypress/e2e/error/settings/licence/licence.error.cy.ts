import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Licence Error', () => {
  const { admin } = Cypress.env('users');
  const { dateInit, dateEnd } = Cypress.env('dateRange');

  beforeEach(() => {
    cy.intercept('GET', '/licence').as('getAllLicence');
    cy.intercept('GET', '/users').as('getAllUsers');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate List Licence Error', () => {
    cy.intercept('GET', '/licence', { forceNetworkError: true }).as('getAllLicence');
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.valiteToastText('licencias', 'Sucedio un error al listar las licencias');
  });

  it('Create New Licence by User ERROR', () => {
    cy.intercept('POST', '/licence', { forceNetworkError: true }).as('createLicence');
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.get('#btn-new-licence').click();
    cy.wait('@getAllUsers');

    cy.bsDatePickerSelectedRange('input[formControlName="dateRange"]', {
      dateInit,
      dateEnd,
    });
    cy.get('ng-select[formcontrolname=codUser]').type(`{enter}`);
    cy.get('input[formcontrolname=description]').type('Test E2E Licence');
    cy.get('input[formcontrolname=description]').click({ force: true });
    cy.get('#btn-create-licence').click();
    cy.wait('@createLicence');
    cy.valiteToastText('licencia', 'Sucedio un error al registrar la licencia');
  });

  it('Create New Licence List Users Error', () => {
    cy.intercept('GET', '/users', { forceNetworkError: true }).as('getAllUsers');
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.get('#btn-new-licence').click();
    cy.get('@getAllUsers');
    cy.valiteToastText('usuarios', 'Sucedio un error al listar los usuarios');
  });

  it('Validate Create Licence Message Error Inputs Restriction', () => {
    cy.get('#btn-licence').click();
    cy.get('#btn-new-licence').click();
    cy.wait('@getAllUsers');
    cy.get('input[formControlName=dateRange]').click();
    cy.get('input[formControlName=dateRange]').click();
    cy.get('ng-select[formControlName=codUser]').click();
    cy.get('input[formControlName=dateRange]').click();
    cy.get('input[formControlName=dateRange]').click();
    cy.get('input[formControlName=description]').click();
    cy.get('#btn-create-licence').should('be.disabled').click({ force: true });
    cy.get('#required-dateRange')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requieren fechas');
      });

    cy.get('#required-user')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere usuario');
      });

    cy.get('#required-dateRange')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requieren fechas');
      });

    cy.get('input[formControlName=description]').type('123');

    cy.get('#minlength-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere al menos 5 caracteres');
      });
  });

  it('Validate Update Licence Message Error Inputs Restriction', () => {
    cy.get('#btn-licence').click();
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('input[formControlName=description]').clear().click();
    cy.get('#btn-update-licence').should('be.disabled').click({ force: true });

    cy.get('#required-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere descripción');
      });

    cy.get('input[formControlName=description]').type('123');

    cy.get('#minlength-description')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere al menos 5 caracteres');
      });
    cy.get('#btn-update-licence').should('be.disabled');
  });

  it('Update Licence By User Error ', () => {
    cy.intercept('PATCH', '/licence', { forceNetworkError: true }).as('updateLicence');
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-licence').click();
    cy.wait('@updateLicence');
    cy.valiteToastText('licencia', 'Sucedio un error al actualizar la licencia');
  });

  it('Delete Licence By User Error', () => {
    cy.intercept('GET', '/licence', { fixture: 'licence/list-licence' }).as(
      'getAllLicence',
    );
    cy.intercept('DELETE', '/licence/*', { forceNetworkError: true }).as('deleteLicence');
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteLicence');
    cy.valiteToastText('licencia', 'Sucedio un error al eliminar la licencia');
  });
});
