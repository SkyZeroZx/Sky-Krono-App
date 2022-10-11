describe('Home Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.login(employee.username, employee.password);
  });

  it('Validate Home count correct days absents and later', () => {
    cy.intercept('GET', '/attendance/history', { fixture: 'home/history' }).as('history');
    cy.wait('@history');
    cy.get('#days-later > strong')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('3 días');
      });
    cy.get('#days-absent > strong')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('4 días');
      });
  });
});
