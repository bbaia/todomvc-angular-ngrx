describe('TODO MVC', () => {
  it('should display todos', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('/');
    cy.title().should('eq', 'TodoMVC app using Angular & NgRx');
    cy.contains('todos');
    cy.get('.new-todo').should('be.visible');
    cy.get('.todo-list li').should('have.length', 3);
    cy.get('.todo-count').should('have.text', '1 items left');
    cy.get('.filters a.selected').should('contain.text', 'All');
    cy.get('.clear-completed').should('be.visible');
    cy.location('hash').should('eq', '#/all');
  });

  it('should hide #main and #footer with no todos', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('/');
    cy.get('.new-todo').should('be.visible');
    cy.get('.main').should('not.exist');
    cy.get('.footer').should('not.exist');
  });

  it('should display all todos with "/all" path', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/all');
    cy.get('.filters a.selected').should('contain.text', 'All');
    cy.get('.todo-list li').should('have.length', 3);
  });

  it('should display active todos with "/active" path', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/active');
    cy.get('.filters a.selected').should('contain.text', 'Active');
    cy.get('.todo-list li').should('have.length', 1);
  });

  it('should display completed todos with "/completed" path', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/completed');
    cy.get('.filters a.selected').should('contain.text', 'Completed');
    cy.get('.todo-list li').should('have.length', 2);
  });

  it('should display all todos with "All" filter', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/completed');
    cy.get('.filters').contains('All').click();
    cy.get('.todo-list li').should('have.length', 3);
    cy.get('.filters a.selected').should('contain.text', 'All');
    cy.location('hash').should('eq', '#/all');
  });

  it('should display active todos with "Active" filter', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/completed');
    cy.get('.filters').contains('Active').click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.filters a.selected').should('contain.text', 'Active');
    cy.location('hash').should('eq', '#/active');
  });

  it('should display completed todos with "Completed" filter', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/all');
    cy.get('.filters').contains('Completed').click();
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.filters a.selected').should('contain.text', 'Completed');
    cy.location('hash').should('eq', '#/completed');
  });

  it('should hide "Clear completed" button with nothing check', () => {
    cy.intercept('GET', 'assets/todos.json', [
      {
        id: 0.123456789,
        text: 'Remove before flight!',
        creationDate: new Date(2018, 1, 6),
        completed: false,
      },
    ]);
    cy.visit('#/all');
    cy.get('.clear-completed').should('not.exist');
  });

  it('adds new todo', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Buy some cheese');
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-count').should('have.text', '1 items left');
  });

  it('should clear text input field when a new item is added', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Buy some cheese');
    cy.get('.new-todo').should('have.text', '');
  });

  it('marks todos as complete', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Learn Angular').as('firstTodo');
    cy.addTodo('Learn NgRx').as('secondTodo');
    cy.get('.todo-count').should('have.text', '2 items left');
    cy.get('@firstTodo').find('.toggle').check();
    cy.get('.todo-count').should('have.text', '1 items left');
    cy.get('.clear-completed').should('be.visible');
  });

  it('un-marks todos as complete', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('#/all');
    cy.get('.todo-count').should('have.text', '1 items left');
    cy.get('.todo-list li').eq(0).find('.toggle').uncheck();
    cy.get('.todo-count').should('have.text', '2 items left');
  });

  it('deletes todo', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Learn Angular').as('firstTodo');
    cy.addTodo('Learn NgRx').as('secondTodo');
    cy.get('.todo-count').should('have.text', '2 items left');
    cy.get('@secondTodo')
      .find('.destroy')
      .should('be.hidden')
      .invoke('show')
      .click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-count').should('have.text', '1 items left');
    cy.get('.clear-completed').should('not.exist');
  });

  it('clears completed todos', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Learn Angular').as('firstTodo');
    cy.addTodo('Learn NgRx').as('secondTodo');
    cy.get('@secondTodo').find('.toggle').check();
    cy.get('.clear-completed').should('be.visible').click();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.clear-completed').should('not.exist');
  });

  it('edits todo', () => {
    cy.intercept('GET', 'assets/todos.json', []);
    cy.visit('#/all');
    cy.addTodo('Learn Angular').as('firstTodo');
    cy.addTodo('Learn NgRx').as('secondTodo');
    cy.get('@firstTodo').dblclick();
    cy.get('@firstTodo').find('.edit').type(' & RxJS{enter}');
    cy.get('@firstTodo').should('contain', 'Learn Angular & RxJS');
  });
});
