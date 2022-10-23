import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Manage User Interface', () => {
  const { admin, reset } = Cypress.env('users');
  beforeEach(() => {
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getAllUsers');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
    cy.get('#btn-manage-users').click();
  });

  it('Validate Manage User Interface', () => {
    cy.get('#title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Gestion Usuarios');
      });
    cy.get('#btn-create-user')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Nuevo');
      });
    cy.get('#btn-pdf-user')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('PDF');
      });
    // Validate Headers Of Table
    cy.get('th[scope=col]').then((element) => {
      expect(element[0].innerText.trim()).equal('CODIGO');
      expect(element[1].innerText.trim()).equal('EMAIL');
      expect(element[2].innerText.trim()).equal('NOMBRES');
      expect(element[3].innerText.trim()).equal('APELLIDO PATERNO');
      expect(element[4].innerText.trim()).equal('APELLIDO MATERNO');
      expect(element[5].innerText.trim()).equal('ROL');
      expect(element[6].innerText.trim()).equal('ESTADO');
      expect(element[7].innerText.trim()).equal('CARGO');
      expect(element[8].innerText.trim()).equal('HORARIO');
      expect(element[9].innerText.trim()).equal('FECHA CREACION');
      expect(element[10].innerText.trim()).equal('FECHA MODIFICADO');
      expect(element[11].innerText.trim()).equal('RESETEO');
      expect(element[12].innerText.trim()).equal('EDITAR');
      expect(element[13].innerText.trim()).equal('ELIMINAR');
    });
  });

  it('Validate Manage User Reset User Interface', () => {
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-refresh-02').first().click();
    cy.get('#swal2-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Reseteo de contraseña de usuario');
      });
    cy.get('#swal2-html-container')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          `Se va resetear la contraseña del usuario ${reset.username} , ¿Esta seguro?`,
        );
      });
  });

  it('Validate Manage User Delete User Interface', () => {
    cy.get('@getAllUsers');
    cy.get('input[formControlName=filter]').type(reset.username);
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('#swal2-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Eliminar Usuario');
      });
    cy.get('#swal2-html-container')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals(
          `Se va eliminar al usuario ${reset.username} ¿Esta seguro?`,
        );
      });
  });
});
