describe('Login Interface', () => {
  const { visit } = Cypress.env('service');
  const { firstLogin } = Cypress.env('users');
  beforeEach(() => {
    cy.visit(visit);
  });

  it('Validate Interface Login', () => {
    cy.log('**Validate Interface titles**');

    cy.get('h1')
      .invoke('text')
      .then((text) => {
        expect(text).equal('Bienvenido');
      });

    cy.get('#title-credentials')
      .invoke('text')
      .then((text) => {
        expect(text).equal('Ingrese sus credenciales');
      });

    cy.log('**Validate buttons exist and text**');

    cy.get('#btnLogin')
      .should('be.visible')
      .should('be.disabled')
      .should('exist')
      .invoke('text')
      .then((text) => {
        expect(text).equal('Login');
      });

    cy.log('**Validate font awesome icons**');
    cy.get('#btn-fingerprint').should('be.visible').should('exist').should('be.disabled');
    cy.get('#icon-fingerPrint').then((res) => {
      expect(res[0].className).equals('fas fa-fingerprint');
    });

    cy.get('#icon-email')
      .should('be.visible')
      .should('exist')
      .then((res) => {
        expect(res[0].className).equals('tim-icons icon-email-85');
      });

    cy.get('#icon-password')
      .should('be.visible')
      .should('exist')
      .then((res) => {
        expect(res[0].className).equals('tim-icons icon-lock-circle');
      });

    cy.log('**Validate placerholders inputs**');

    cy.get('input[formControlName="username"]')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Email');

    cy.get('input[formControlName="password"]')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Password');
  });

  it('Validate First Login Sweet Alert', () => {
    cy.login(firstLogin.username, firstLogin.password);
    cy.get('#swal2-title')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Es su primer login');
      });

    cy.get('#swal2-html-container')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Se recomienda cambiar su contraseña');
      });

    cy.get('.swal2-confirm')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Confirmar');
      });

    cy.get('.swal2-cancel')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Cancelar');
      });
  });
});
