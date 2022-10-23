import { formatPhoneContacts, isMobile, optionsSwipe } from '../../../helper/helper';

describe('Contacts Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { employee, admin } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getUsers');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('contactos').click();
  });

  it('Validate contacts filter user', () => {
    cy.get('.input-search-contact-list').type(admin.name);
    cy.wait('@getUsers');
    cy.fixture('users/list-users').then((users) => {
      cy.get('span > :nth-child(1)')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equal(users[0].name);
        });

      cy.get('span > :nth-child(3)')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equal(users[0].fatherLastName);
        });

      cy.get('span > :nth-child(5)')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equal(users[0].motherLastName);
        });

      cy.get('.phone-small')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equal(formatPhoneContacts(users[0].phone));
        });
    });

    cy.get('.search-list > .fadeEnter > :nth-child(1)')
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('S');
      });

    cy.get(':nth-child(1) > div > span')
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('S');
      });
  });

  it('Validate navigate contact detail', () => {
    cy.get('.input-search-contact-list').type(admin.name);
    cy.wait('@getUsers');
    cy.get('.search-list-item').first().click();
    cy.url()
      .should('contains', 'contact-detail')
      .then(() => {
        const user = JSON.parse(localStorage.getItem('contact-detail'));
        cy.fixture('users/list-users').then((users) => {
          expect(user.username).equal(users[0].username);
          expect(user.chargue).equal(users[0].chargue);
          expect(user.schedule).equal(users[0].schedule);
          expect(user.fatherLastName).equal(users[0].fatherLastName);
          expect(user.motherLastName).equal(users[0].motherLastName);
        });
      });
  });
});
