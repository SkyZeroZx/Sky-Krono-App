describe('Home Interface', () => {
  const { admin } = Cypress.env('users');

  beforeEach(() => {
    cy.login(admin.username, admin.password);
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
    cy.get('.current-week-title > .last-week')
      .then((element) => {
        expect(element[0].innerText).equal('L');
        expect(element[1].innerText).equal('M');
        expect(element[2].innerText).equal('X');
        expect(element[3].innerText).equal('J');
        expect(element[4].innerText).equal('V');
        expect(element[5].innerText).equal('S');
        expect(element[6].innerText).equal('D');
      });
  });
});
