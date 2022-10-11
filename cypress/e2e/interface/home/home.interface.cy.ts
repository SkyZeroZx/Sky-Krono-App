describe('Home Interface', () => {
  const { visit } = Cypress.env('service');
  const { employee } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
    cy.login(employee.username, employee.password);
  });

  it('Validate Home Interface', () => {
    cy.intercept('GET', '/attendance/history', { fixture: 'home/history' }).as('history');
    cy.wait('@history');

    cy.get('#titleHome')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Bienvenido');
      });

    cy.get('#title-indicator-attendance')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Indicador de Asistencia');
      });
    cy.get('#title-current-week')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Semana actual');
      });
    cy.get('#title-last-week')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Semana Anterior');
      });

    cy.get('#title-later')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Atrasos');
      });

    cy.get('#title-absent')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Faltas');
      });

    // Validate Letter Titles of Last Attendance
    cy.get(':nth-child(3) > .current-week-title')
      .children()
      .then((children) => {
        expect(children[0].innerText).equal('L');
        expect(children[1].innerText).equal('M');
        expect(children[2].innerText).equal('X');
        expect(children[3].innerText).equal('J');
        expect(children[4].innerText).equal('V');
        expect(children[5].innerText).equal('S');
        expect(children[6].innerText).equal('D');
      });
  });
});
