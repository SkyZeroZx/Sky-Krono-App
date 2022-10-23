import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Contacts Interface', () => {
  const { employee, admin } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getUsers');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('contactos').click();
    cy.get('.input-search-contact-list').type(admin.name);
    cy.wait('@getUsers');
  });

  it('Validate interface contact detail', () => {
    cy.get('.search-list-item').first().click();
    cy.get('.full-name')
      .invoke('text')
      .then((text) => {
        cy.fixture('users/list-users').then(
          ([
            { name, fatherLastName, motherLastName, phone, username, chargue, role },
          ]) => {
            expect(text.trim()).equal(`${name}  ${fatherLastName}  ${motherLastName}`);

            cy.get('.phone')
              .should('have.attr', 'href')
              .and('include', phone)
              .and('include', 'tel');

            cy.get('.whatsapp')
              .should('have.attr', 'href')
              .and('include', phone)
              .and('include', 'https://wa.me');

            cy.get('#email-contact-detail')
              .should('have.attr', 'href')
              .and('include', username);

            cy.get('#role-contact-detail')
              .invoke('text')
              .then((text) => {
                expect(text.trim()).equal(role);
              });

            cy.get('#chargue-contact-detail')
              .invoke('text')
              .then((text) => {
                expect(text.trim()).equal(chargue);
              });

            cy.get('.search-list-item > img').should('exist').should('be.visible');
          },
        );
      });

    cy.get('.title')
      .invoke('text')
      .then((title) => {
        expect(title.trim()).equal('Perfil');
      });
  });

  it('Valite preview contact detail', () => {
    cy.get('.search-list-item > img').first().click();
    cy.get('.mb-2')
      .invoke('text')
      .then((text) => {
        cy.fixture('users/list-users').then(
          ([{ name, fatherLastName, motherLastName, phone, username }]) => {
            expect(text.trim()).equal(`${name} ${fatherLastName} ${motherLastName}`);
            cy.get('#email').should('have.attr', 'href').and('include', username);
            cy.get('#phone').should('have.attr', 'href').and('include', phone);
            cy.get('#whatsapp')
              .should('have.attr', 'href')
              .and('include', phone)
              .and('include', 'https://wa.me');
            cy.get('#swalPhotoUser').should('exist').should('be.visible');
          },
        );
      });
  });
});
