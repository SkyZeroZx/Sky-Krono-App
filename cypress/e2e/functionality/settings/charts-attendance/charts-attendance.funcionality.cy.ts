import { isMobile, optionsSwipe } from '@helper/helper';
import { looksTheSame } from '../../../../util/util';

describe('Login Funcionality', () => {
  const { admin } = Cypress.env('users');
  const log = true;

  beforeEach(() => {
    cy.intercept('GET', '/users').as('getAllUsers');
    cy.intercept('POST', '/attendance/chart', { fixture: 'chart/chart' }).as(
      'getAllCharts',
    );
    cy.login(admin.username, admin.password);
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('opciones').click();
    cy.get('#btn-charts-attendance').click();
    cy.wait('@getAllUsers');
    cy.wait('@getAllCharts');
  });

  it('Load Initial Charts in Charts Attendance', () => {
    // Delay for animation CANVAS Ng2 Charts
    cy.wait(5000);
    if (isMobile()) {
      looksTheSame('mobile/all/chart-bar-attendance.png', '#chart-bar-attendance');
      looksTheSame('mobile/all/chart-linear-attendance.png', '#chart-linear-attendance');
      looksTheSame('mobile/all/chart-pie-attendance.png', '#chart-pie-attendance');
      looksTheSame('mobile/all/chart-polar-attendance.png', '#chart-polar-attendance');
    } else {
    }
  });

  it('Selected User and Load Chart Attendance', () => {
    cy.intercept('POST', '/attendance/chart-user', { fixture: 'chart/user/chart-user' }).as('getChartsByUser');
    cy.get('ng-select[formcontrolname=id]').click().type(`${admin.name}{enter}`);
    cy.wait('@getChartsByUser');
    // Delay for animation CANVAS Ng2 Charts
    cy.wait(6000);
    if (isMobile()) {
      looksTheSame('mobile/user/chart-bar-attendance-user.png', '#chart-bar-attendance');
      looksTheSame('mobile/user/chart-linear-attendance-user.png', '#chart-linear-attendance');
      looksTheSame('mobile/user/chart-pie-attendance-user.png', '#chart-pie-attendance');
      looksTheSame('mobile/user/chart-polar-attendance-user.png', '#chart-polar-attendance');
    } else {
    }
  });
});
