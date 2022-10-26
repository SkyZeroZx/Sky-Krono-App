describe('Home Funcionality', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
    cy.intercept('GET', '/attendance/history', { fixture: 'home/history' }).as('history');
  });

  it('Validate Home count correct days absents and later', () => {
    cy.wait('@history');
    cy.get('#days-later > strong')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('4 días');
      });
    cy.get('#days-absent > strong')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('0 días');
      });
  });
});
