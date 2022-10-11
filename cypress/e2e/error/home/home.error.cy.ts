describe('Home Error', () => {
  const { visit } = Cypress.env('service');
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.login(employee.username, employee.password);
  });

  it('Validate Home Network Error', () => {
    cy.intercept('GET', '/attendance/history', { forceNetworkError: true }).as('history');
    cy.wait('@history');
    cy.get('#toast-container')
      .find('div')
      .find('div')
      .contains('historial')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Sucedio un error al obtener el historial');
      });
  });
});
