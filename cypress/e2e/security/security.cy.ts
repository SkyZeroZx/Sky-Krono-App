describe('Security', () => {
  const { visit } = Cypress.env('service');
  const { employee, firstLogin } = Cypress.env('users');
  const listUrlAdmin: string[] = [
    'manage-users',
    'schedule',
    'chargue',
    'types',
    'licence',
    'calendar-admin',
  ];
  const listUrlNotAccessible: string[] = [
    'home',
    'manage-users',
    'schedule',
    'chargue',
    'types',
    'user-profile',
    'licence',
    'change-password',
    'attendance',
    'calendar-admin',
    'calendar-view',
  ];

  beforeEach(() => {
    cy.visit(visit);
  });

  it('Validate not accessible url if not login', () => {
    listUrlNotAccessible.forEach((url) => {
      cy.visit(visit + '/#/' + url);
      cy.url().should('include', 'login');
    });
  });

  it('Valite user role employee not accessible admin views', () => {
    cy.login(employee.username, employee.password);
    listUrlAdmin.forEach((url) => {
      cy.visit(visit + '/#/' + url);
      cy.url().should('include', 'home');
    });
  });

  it('Validate first login not redirect home page', () => {
    cy.login(firstLogin.username, firstLogin.password);
    cy.get('.swal2-confirm').click();
    listUrlNotAccessible.forEach((url) => {
      cy.visit(visit + '/#/' + url);
      cy.url().should('include', 'change-password');
    });
  });
});
