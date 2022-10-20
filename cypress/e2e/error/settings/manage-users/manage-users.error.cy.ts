import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Manage User Error', () => {
  const { admin, reset } = Cypress.env('users');
  beforeEach(() => {
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getAllUsers');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate Manage User List Users Error', () => {
    cy.intercept('GET', '/users', { forceNetworkError: true }).as('getAllUsers');
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.valiteToastText('usuarios', 'Error al listar usuarios');
  });

  it('Validate Manage User Reset User Error', () => {
    cy.intercept('POST', '/auth/reset-password', { forceNetworkError: true }).as(
      'resetPassword',
    );
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-refresh-02').first().click();

    cy.get('.swal2-confirm').click();
    cy.wait('@resetPassword');
    cy.valiteToastText('usuario', 'Sucedio un error al resetear el usuario');
  });

  it('Validate Manage User Delete User Error', () => {
    cy.intercept('DELETE', '/users/*', { forceNetworkError: true }).as('deleteUser');
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-simple-remove').first().click();

    cy.get('.swal2-confirm').click();
    cy.wait('@deleteUser');
    cy.valiteToastText('usuario', 'Sucedio un error al eliminar el usuario');
  });

  it('Valite Create New User Error', () => {
    cy.intercept('POST', '/users', { forceNetworkError: true }).as('createUser');
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('#btn-create-user').click();

    cy.get('input[formControlName=username]').type('example@mail.com');
    cy.get('input[formControlName=name]').type('John');
    cy.get('input[formControlName=fatherLastName]').type('Doe');
    cy.get('input[formControlName=motherLastName]').type('Doe');
    cy.get('input[formControlName=phone]').type('961008127');
    cy.get('ng-select[formcontrolname=codChargue]').click().type(`{enter}`);
    cy.get('ng-select[formcontrolname=codSchedule]').click().type(`{enter}`);
    cy.get('input[formControlName=name]').click({force: true});
    cy.get('input[formControlName=name]').click({force: true});
    cy.get('button[id=btnCreateUser]').click();
    cy.valiteToastText('usuario', 'Sucedio un error al crear al usuario');
  });

  it('Validate Create New User Inputs Messages Restriction Error', () => {
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('#btn-create-user').click();
    cy.get('input[formControlName=username]').click();
    cy.get('input[formControlName=name]').click();
    cy.get('input[formControlName=fatherLastName]').click();
    cy.get('input[formControlName=motherLastName]').click();
    cy.get('input[formControlName=phone]').click();
    cy.get('ng-select[formcontrolname=codChargue]').click();
    cy.get(
      ':nth-child(3) > .form-group > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper',
    )
      .click({ force: true })
      .click({ force: true });

    cy.get('#required-username')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere email');
      });

    cy.get('#required-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar nombres');
      });

    cy.get('#required-father-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar apellido paterno');
      });

    cy.get('#required-mother-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar apellido materno');
      });

    cy.get('#required-phone')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar celular');
      });

    cy.get('#required-chargue')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere seleccionar cargo');
      });

    cy.get('#required-schedule')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere seleccionar horario');
      });

    cy.get('button[id=btnCreateUser]').should('be.disabled').should('exist');

    cy.get('input[formControlName=username]').click().type('123');
    cy.get('input[formControlName=name]').click().type('a');
    cy.get('input[formControlName=fatherLastName]').click().type('a');
    cy.get('input[formControlName=motherLastName]').click().type('a');
    cy.get('input[formControlName=phone]').click().type('123');

    cy.get('#minlengt-phone')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima del celular es de 9 caracteres');
      });

    cy.get('#minlengt-mother-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'La longitud minima del apellido materno es de 2 caracteres',
        );
      });

    cy.get('#minlength-father-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'La longitud minima del apellido paterno es de 2 caracteres',
        );
      });

    cy.get('#minlength-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima del nombre es de 2 caracteres');
      });

    cy.get('button[id=btnCreateUser]').should('be.disabled').should('exist');
  });

  it('Validate Update User Error', () => {
    cy.intercept('PATCH', '/users', { forceNetworkError: true }).as('updateUser');
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-user').click();
    cy.wait('@updateUser');
    cy.valiteToastText('usuario', 'Sucedio un error al actualizar el usuario');
  });

  it('Validate Update List Chargue/Schedule Error', () => {
    cy.intercept('GET', '/chargue', { forceNetworkError: true }).as('getAllChargue');
    cy.intercept('GET', '/schedule', { forceNetworkError: true }).as('getAllSchedule');
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('#btn-update-user').click();
    cy.valiteToastText('error', 'error');
  });

  it('Validate Update User Inputs Messages Restriction Error', () => {
    cy.get('button').contains('Usuarios').click();
    cy.get('@getAllUsers');
    cy.get('i.tim-icons.icon-pencil').first().click();
    cy.get('input[formControlName=name]').clear().click();
    cy.get('input[formControlName=fatherLastName]').clear().click();
    cy.get('input[formControlName=motherLastName]').clear().click();
    cy.get('input[formControlName=phone]').clear().click();
    cy.get('input[formControlName=name]').click();

    cy.get('#required-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar nombres');
      });

    cy.get('#required-father-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar apellido paterno');
      });

    cy.get('#required-mother-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar apellido materno');
      });

    cy.get('#required-phone')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Se requiere ingresar celular');
      });

    cy.get('#btn-update-user').should('be.disabled').should('exist');

    cy.get('input[formControlName=name]').click().type('a');
    cy.get('input[formControlName=fatherLastName]').click().type('a');
    cy.get('input[formControlName=motherLastName]').click().type('a');
    cy.get('input[formControlName=phone]').click().type('123');

    cy.get('#minlength-phone')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima del celular es de 9 caracteres');
      });

    cy.get('#minlength-mother-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'La longitud minima del apellido materno es de 2 caracteres',
        );
      });

    cy.get('#minlength-father-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'La longitud minima del apellido paterno es de 2 caracteres',
        );
      });

    cy.get('#minlength-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('La longitud minima del nombre es de 2 caracteres');
      });

    cy.get('#btn-update-user').should('be.disabled').should('exist');
  });
});
