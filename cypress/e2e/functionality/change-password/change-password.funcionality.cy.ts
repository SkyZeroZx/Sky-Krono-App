describe('Change Password Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.visit(visit);
    cy.changePasswordNavigate(admin.username, admin.password);
  });

  it('Change Password Ok [MOCK]', () => {
    cy.intercept('auth/change-password', {
      fixture: 'auth/change-password/change-password.json',
    }).as('changePassword');
    cy.get('input[formControlName=oldPassword]').type('someThingValue');
    cy.get('input[formControlName=newPassword]').type('newPasswordAwesome');
    cy.get('input[formControlName=confirmedPassword]').type('newPasswordAwesome');
    cy.get('#btn-change-password').click();
    cy.wait('@changePassword');
    cy.get('#toast-container')
      .find('div')
      .find('div')
      .contains('exitosa')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.contains('Se cambio con exitosa la contraseña');
      });
    cy.url().should('include', 'home');
  });
});
