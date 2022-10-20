import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('User Profile Funcionality', () => {
  const { employee } = Cypress.env('users');
  beforeEach(() => {
    cy.login(employee.username, employee.password);
  });

  it('Get Profile User Error', () => {
    cy.intercept('GET', '/users/profile', { forceNetworkError: true }).as('getProfile');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('perfil').click();
    cy.wait('@getProfile');
    cy.valiteToastText('perfil', 'Sucedio un error al obtener el perfil');
  });

  it('Update user profile Error', () => {
    cy.intercept('GET', '/users/profile', { fixture: '/users/profile/profile' }).as(
      'getProfile',
    );
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('perfil').click();
    cy.wait('@getProfile');
    cy.intercept('PATCH', '/users', { forceNetworkError: true }).as('updateUser');
    cy.get('input[formControlName=name]').clear().type('Employee');
    cy.get('input[formControlName=fatherLastName]').clear().type('fatherLastName');
    cy.get('input[formControlName=motherLastName]').clear().type('motherLastName');
    cy.get('#btn-update-profile').click();
    cy.wait('@updateUser');
    cy.valiteToastText('perfil', 'Error al actualizar su perfil');
  });

  it('Validate message error require and incorrect type inputs', () => {
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('perfil').click();
    cy.get('input[formControlName=name]').clear();
    cy.get('input[formControlName=fatherLastName]').clear();
    cy.get('input[formControlName=motherLastName]').clear();
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

    cy.get('input[formControlName=name]').clear().type('30450340sdf@');
    cy.get('input[formControlName=fatherLastName]').clear().type('30450340sdf@');
    cy.get('input[formControlName=motherLastName]').clear().type('30450340sdf@');

    cy.get('#format-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('El nombre ingresado tiene formato invalido');
      });

    cy.get('#format-mother-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'El apellido materno ingresado tiene formato invalido',
        );
      });

    cy.get('#format-father-lastname')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          'El apellido paterno ingresado tiene formato invalido',
        );
      });
  });

  it('Validate upload new photo user profile Error', () => {
    cy.intercept('POST', '/users/photo', { forceNetworkError: true }).as('uploadPhoto');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('perfil').click();
    cy.get('input[type=file]').attachFile('upload/profile.jpg');
    cy.get('.swal2-confirm').click();
    cy.wait('@uploadPhoto');
    cy.valiteToastText('foto', 'Sucedio un error al subir su foto');
  });
});
