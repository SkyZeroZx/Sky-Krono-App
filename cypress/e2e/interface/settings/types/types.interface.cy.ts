import { isMobile, optionsSwipe } from '../../../../helper/helper';

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

  it('Validate Type Interface', () => {
    cy.get('button').contains('Tipos').click();
    cy.get('#title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Tipos de Tarea');
      });
    cy.get('#btn-new-type')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Nuevo');
      });

    // Validate Headers Of Table
    cy.get('th[scope=col]').then((element) => {
      expect(element[0].innerText.trim()).equal('CODIGO');
      expect(element[1].innerText.trim()).equal('DESCRIPCIÓN');
      expect(element[2].innerText.trim()).equal('HORARIO');
      expect(element[3].innerText.trim()).equal('COLOR');
      expect(element[4].innerText.trim()).equal('EDITAR');
      expect(element[5].innerText.trim()).equal('ELIMINAR');
    });
  });

  it('Validate Delete Type Interface', () => {
    cy.get('button').contains('Tipos').click();
    cy.wait('@getAllTypes');
    cy.get('i.tim-icons.icon-simple-remove').first().click();
    cy.get('#swal2-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Eliminar Tipo');
      });
    cy.fixture('type/list-type').then(([{ description }]) => {
      cy.get('#swal2-html-container')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equals(
            `Se va eliminar el tipo ${description}, ¿Esta seguro?`,
          );
        });
    });
    cy.get('.swal2-confirm').should('exist');
    cy.get('.swal2-cancel').should('exist');
  });
});
