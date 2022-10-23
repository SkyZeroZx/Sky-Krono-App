import { isMobile, optionsSwipe } from '../../../../helper/helper';

describe('Licence Interface', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.intercept('GET', '/users').as('getAllUsers');
    cy.intercept('GET', '/licence').as('getAllLicence');
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
  });

  it('Validate Licence Interface', () => {
    cy.get('#btn-licence').click();
    cy.get('#title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Licencias');
      });
    cy.get('#btn-new-licence')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Nuevo');
      });
    cy.get('#pdf-licence')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('PDF');
      });
    // Validate Headers Of Table
    cy.get('th[scope=col]').then((element) => {
      expect(element[0].innerText.trim()).equal('USUARIO');
      expect(element[1].innerText.trim()).equal('DESCRIPCIÓN');
      expect(element[2].innerText.trim()).equal('EDITAR');
      expect(element[3].innerText.trim()).equal('ELIMINAR');
    });
  });

  it('Delete Licence By User Interface', () => {
    cy.get('#btn-licence').click();
    cy.wait('@getAllLicence');
    cy.get('i.tim-icons.icon-simple-remove').first().click();

    cy.get('#swal2-title')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equals('Eliminar Licencia');
      });
    cy.fixture('licence/list-licence').then(([{ fullName }]) => {
      cy.get('#swal2-html-container')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equals(
            `Se va eliminar la licencia de ${fullName} , ¿Esta seguro?`,
          );
        });
    });
    cy.get('.swal2-confirm').should('exist');
    cy.get('.swal2-cancel').should('exist');
  });
});
