import { isMobile, optionsSwipe } from '../../../helper/helper';

describe('Calendar Admin Error', () => {
  const { admin } = Cypress.env('users');
  beforeEach(() => {
    cy.intercept('GET', '/users', { fixture: 'users/list-users' }).as('getAllUsers');
    cy.intercept('GET', '/type', { fixture: 'type/list-type' }).as('getAllTypes');
    cy.intercept('GET', '/task', { fixture: '/task/list-task-admin' }).as('getTaskAdmin');
    cy.intercept('GET', '/task/task_user/*', { fixture: 'users/list-users' }).as(
      'getUsersByTask',
    );
    cy.login(admin.username, admin.password);
  });

  it('Validate drag an drog update task Error', () => {
    const options = {
      source: { x: 150, y: 0 }, // applies to the element being dragged
      target: { position: 'right' }, // applies to the drop target
      force: true, // applied to both the source and target element
    };
    let optionsDrag = { deltaX: 150, deltaY: 0, ...options };
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
      optionsDrag = { deltaX: 50, deltaY: 0, ...options };
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');
    cy.intercept('PATCH', '/task', { forceNetworkError: true }).as('updateTaskError');
    cy.get('.fc-event-title').first().move(optionsDrag);
    cy.wait('@updateTaskError');
    cy.valiteToastText('tarea', 'Error al actualizar tarea');
  });

  it('Validate Remove Task Error', () => {
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');
    cy.intercept('DELETE', '/task/remove_task/*', { forceNetworkError: true }).as(
      'removeTask',
    );
    cy.get('.fc-event-title').first().click();
    cy.get('.swal2-deny').click();
    cy.wait('@removeTask');
    cy.valiteToastText('tarea', 'Error al eliminar la tarea');
  });

  it('Validate Update Task Error', () => {
    cy.intercept('PATCH', '/task', { forceNetworkError: true }).as('updateTask');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');

    cy.get('.fc-event-title').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.wait('@getUsersByTask');
    cy.get('#btn-update-task').click();
    cy.wait('@updateTask');
    cy.valiteToastText('tarea', 'Error al actualizar la tarea');
  });

  it('Validate create new task Error', () => {
    cy.intercept('POST', '/task', { forceNetworkError: true }).as('createTask');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }

    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();

    cy.get(
      ':nth-child(4) > .fc-day-wed > .fc-daygrid-day-frame > .fc-daygrid-day-events',
    ).click();

    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.fixture('type/list-type').then(([{ description }]) => {
      cy.wait(1000);
      cy.get('input[formControlName=title]').type('Title E2E Cypress');
      cy.get('ng-select[formcontrolname=codType]').click().type(`${description}{enter}`);
      cy.get('input[formControlName=description]').type('Description E2E Cypress');
      cy.get('ng-select[formcontrolname=users]')
        .type(`{enter}`)
        .type(`{enter}`)
        .type(`{enter}`);
      cy.get('input[formControlName=title]').click();
      cy.get('input[formControlName=title]').click();
      cy.get('#btn-create-task').click();
      cy.wait('@createTask');
      cy.valiteToastText('Error', 'Error');
    });
  });

  it('Validate Error List Task in Calendar', () => {
    cy.intercept('GET', '/task', { forceNetworkError: true }).as('getTaskAdmin');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.valiteToastText('tareas', 'Sucedio un error al listar las tareas');
  });

  it('Validate Add/Remove User Of Task in Update Task Error', () => {
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');
    cy.get('.fc-event-title').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.wait('@getUsersByTask');
    cy.intercept('DELETE', '/task?codUser=*&codTask=*', { forceNetworkError: true }).as(
      'removeUserTask',
    );
    cy.get(
      '.ng-select-multiple > .ng-select-container > .ng-value-container > :nth-child(2) > .ng-value-icon',
    ).click();
    cy.wait('@removeUserTask');
    cy.valiteToastText('remover', 'Error al remover usuario');
    cy.wait(3000);
    cy.get('ng-select[formcontrolname=users]').type('{enter}');
    cy.intercept('POST', '/task/add_user', { forceNetworkError: true }).as('addUser');
    cy.wait('@addUser');
    cy.valiteToastText('agregar', 'Error al agregar usuario');
  });

  it('Validate create New Task - Send Notifications Error', () => {
    cy.intercept('POST', '/task', { fixture: 'response/response-ok' }).as('createTask');
    cy.intercept('POST', '/notificacion/send', { forceNetworkError: true }).as(
      'sendNotifications',
    );

    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }

    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();

    cy.get(
      ':nth-child(4) > .fc-day-wed > .fc-daygrid-day-frame > .fc-daygrid-day-events',
    ).click();

    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.fixture('type/list-type').then(([{ description }]) => {
      cy.wait(1000);
      cy.get('input[formControlName=title]').type('Title E2E Cypress');
      cy.get('ng-select[formcontrolname=codType]').click().type(`${description}{enter}`);
      cy.get('input[formControlName=description]').type('Description E2E Cypress');
      cy.get('ng-select[formcontrolname=users]')
        .type(`{enter}`)
        .type(`{enter}`)
        .type(`{enter}`);
      cy.get('input[formControlName=title]').click();
      cy.get('input[formControlName=title]').click();
      cy.get('#btn-create-task').click();
      cy.wait('@createTask');
      cy.wait('@sendNotifications').then(() => {
        cy.wait(2000);
        cy.valiteToastText('Error', 'Error al enviar notificaciones');
      });
    });
  });

  it('Validate create New Task - List Types/Users Error', () => {
    cy.intercept('GET', '/users', { forceNetworkError: true }).as('getAllUsers');
    cy.intercept('GET', '/type', { forceNetworkError: true }).as('getAllTypes');
    cy.intercept('POST', '/task', { fixture: 'response/response-ok' }).as('createTask');
    cy.intercept('POST', '/notificacion/send', { forceNetworkError: true }).as(
      'sendNotifications',
    );

    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }

    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();

    cy.get(
      ':nth-child(4) > .fc-day-wed > .fc-daygrid-day-frame > .fc-daygrid-day-events',
    ).click();

    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.valiteToastText('Error', 'Error');
  });

  it('Validate Update Task - List Types/Users Error', () => {
    cy.intercept('GET', '/users', { forceNetworkError: true }).as('getAllUsers');
    cy.intercept('GET', '/type', { forceNetworkError: true }).as('getAllTypes');
    cy.intercept('PATCH', '/task', { forceNetworkError: true }).as('updateTask');
    if (isMobile()) {
      cy.get('.content').realSwipe('toRight', optionsSwipe);
    }
    cy.get('.sidebar-wrapper').find('p').contains('calendario').click();
    cy.wait('@getTaskAdmin');

    cy.get('.fc-event-title').first().click();
    cy.get('.swal2-confirm').click();
    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.wait('@getUsersByTask');

    cy.wait('@getAllUsers');
    cy.wait('@getAllTypes');
    cy.valiteToastText('Error', 'Error');
  });
});
