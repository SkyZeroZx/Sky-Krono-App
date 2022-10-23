import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Manage User Funcionality', () => {
  const { admin, reset } = Cypress.env('users');
  beforeEach(() => {
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getAllUsers');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate Manage User Reset User OK', () => {
    cy.intercept('POST', '/auth/reset-password', { fixture: 'response/response-ok' }).as(
      'resetPassword',
    );
    cy.get('#btn-manage-users').click();
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-refresh-02').first().click();
    cy.get(':nth-child(12) > .tim-icons');
    cy.get('.swal2-confirm').click();
    cy.wait('@resetPassword');
    cy.valiteToastText('reseteo', 'Se reseteo exitosamente la contraseña');
  });

  it('Validate Manage User Delete User OK', () => {
    cy.intercept('DELETE', '/users/*', { fixture: 'response/response-ok' }).as(
      'deleteUser',
    );
    cy.get('#btn-manage-users').click();
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get(':nth-child(12) > .tim-icons');
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteUser');
    cy.valiteToastText('elimino', 'Se elimino exitosamente el usuario');
  });

  it('Valite Create New User Ok [MOCK]', () => {
    cy.intercept('POST', '/users', { fixture: 'response/response-ok' }).as('createUser');
    cy.get('#btn-manage-users').click();
    cy.get('@getAllUsers');
    cy.get('#btn-create-user').click();

    cy.get('input[formControlName=username]').type('example@mail.com');
    cy.get('input[formControlName=name]').type('John');
    cy.get('input[formControlName=fatherLastName]').type('Doe');
    cy.get('input[formControlName=motherLastName]').type('Doe');
    cy.get('input[formControlName=phone]').type('961008127');
    cy.get('ng-select[formcontrolname=codChargue]').click().type(`{enter}`);
    cy.get('ng-select[formcontrolname=codSchedule]').click().type(`{enter}`);
    cy.get('input[formControlName=name]').click({ force: true });
    cy.get('button[id=btnCreateUser]').click();
    cy.valiteToastText('usuario', 'Se creo exitosamente el usuario');
  });

  it('Validate Update User Ok', () => {
    cy.intercept('PATCH', '/users').as('updateUser');
    cy.get('#btn-manage-users').click();
    cy.get('@getAllUsers');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-user').click();
    cy.wait('@updateUser');
    cy.valiteToastText('usuario', 'Se actualizo exitosamente el usuario');
  });
});
