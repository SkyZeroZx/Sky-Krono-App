import { generateRandomString } from '../../../helper/helper';

describe('Change Password Error', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.changePasswordNavigate(admin.username, admin.password);
  });

  it('Change Password Network Error', () => {
    cy.intercept('auth/change-password', { forceNetworkError: true }).as(
      'changePassword',
    );
    cy.get('input[formControlName=oldPassword]').type('someThingValue');
    cy.get('input[formControlName=newPassword]').type('newPasswordAwesome');
    cy.get('input[formControlName=confirmedPassword]').type('newPasswordAwesome');
    cy.get('#btn-change-password').click();
    cy.wait('@changePassword');
    cy.valiteToastText('cambiar', 'Error al cambiar contraseña');
  });

  it('Change Password Required Fields , min lenght , max lenght', () => {
    const randomString = generateRandomString(129);

    cy.get('input[formControlName=oldPassword]')
      .type(randomString)
      .should('have.value', randomString.substring(0, 128));

    cy.get('input[formControlName=newPassword]')
      .type(randomString)
      .type(randomString)
      .should('have.value', randomString.substring(0, 128));
    cy.get('input[formControlName=confirmedPassword]')
      .type(randomString)
      .type(randomString)
      .should('have.value', randomString.substring(0, 128));

    cy.get('input[formControlName=oldPassword]').clear();
    cy.get('input[formControlName=newPassword]').clear();
    cy.get('input[formControlName=confirmedPassword]').clear();
    cy.get('input[formControlName=confirmedPassword]').clear();

    cy.get('#msgOldPasswordReq')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Se requiere ingresar contraseña actual');
      });

    cy.get('#msgNewPassReq')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Se requiere ingresar nueva contraseña');
      });

    cy.get('#msgConfirPassReq')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('Se requiere ingresar confirmar nueva contraseña');
      });

    cy.get('input[formControlName=oldPassword]').type('1');
    cy.get('input[formControlName=newPassword]').type('1');
    cy.get('input[formControlName=confirmedPassword]').type('1');
    cy.get('input[formControlName=oldPassword]').click();

    cy.get('#msgOldPasswordMin')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('La longitud minima es 6 caracteres');
      });

    cy.get('#msgOldPasswordMin')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('La longitud minima es 6 caracteres');
      });

    cy.get('#msgConfirPassMin')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).equal('La longitud minima es 6 caracteres');
      });
  });
});
