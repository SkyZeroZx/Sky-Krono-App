describe('Change Password Interface', () => {
  const { visit } = Cypress.env('service');
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.visit(visit);
    cy.changePasswordNavigate(admin.username, admin.password);
  });

  it('Change Password Titles , inputs and buttons', () => {
    cy.url().should('include', 'change-password');
    cy.get('#titleChangePassword')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Cambio de Contraseña');
      });

    cy.get('input[formControlName="oldPassword"]')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Contraseña Actual');

    cy.get('input[formControlName="newPassword"]')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Nueva Contraseña');

    cy.get('input[formControlName="confirmedPassword"]')
      .should('be.visible')
      .should('exist')
      .invoke('attr', 'placeholder')
      .should('eq', 'Confirme Nueva Contraseña');

    cy.get('#btn-change-password')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Cambiar Contraseña');
      });

    cy.get('#btnBack')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Atras');
      });
  });
});
