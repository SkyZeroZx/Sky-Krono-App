describe('Change Password Funcionality', () => {
  const { visit } = Cypress.env('service');
  const { firstLogin, admin } = Cypress.env('users');

  beforeEach(() => {
    cy.visit(visit);
  });

  it('Change Password Ok [MOCK]', () => {
    cy.changePasswordNavigate(admin.username, admin.password);
    cy.intercept('auth/change-password', {
      fixture: 'auth/change-password/change-password.json',
    }).as('changePassword');
    cy.get('input[formControlName=oldPassword]').type('someThingValue');
    cy.get('input[formControlName=newPassword]').type('newPasswordAwesome');
    cy.get('input[formControlName=confirmedPassword]').type('newPasswordAwesome');
    cy.get('#btn-change-password').click();
    cy.wait('@changePassword');
    cy.valiteToastText('exitosa', 'Se cambio con exitosa la contraseña');
    cy.url().should('include', 'home');
  });

  it('Change Password in case of first login OK [MOCK]', () => {
    cy.login(firstLogin.username, firstLogin.password);
    cy.get('.swal2-confirm').click();
    cy.intercept('auth/change-password', {
      fixture: 'auth/change-password/change-password.json',
    }).as('changePassword');
    cy.wait(500);
    cy.get('input[formControlName=oldPassword]').type('someThingValue');
    cy.get('input[formControlName=newPassword]').type('newPasswordAwesome');
    cy.get('input[formControlName=confirmedPassword]').type('newPasswordAwesome');
    cy.get('#btn-change-password').click();
    cy.wait('@changePassword');
    cy.valiteToastText('exitosa', 'Se cambio con exitosa la contraseña');
    cy.url()
      .should('include', 'login')
      .then(() => {
        expect(localStorage.getItem('user')).to.be.null;
      });
  });
});
