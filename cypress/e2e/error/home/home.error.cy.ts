describe('Home Error', () => {
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.login(employee.username, employee.password);
  });

  it('Validate Home Network Error', () => {
    cy.intercept('GET', '/attendance/history', { forceNetworkError: true }).as('history');
    cy.wait('@history');
    cy.valiteToastText('historial', 'Sucedio un error al obtener el historial');
  });
});
