describe('TODO MVC', () => {
  it('smoke test', () => {
    cy.intercept('GET', 'assets/todos.json', { fixture: 'example.json' });
    cy.visit('/');
    cy.title().should('eq', 'TodoMVC app using Angular & NgRx');
    cy.contains('todos');
    cy.get('.new-todo').should('be.visible');
    cy.get('.todo-list li').should('have.length', 3);
    cy.get('.todo-count').should('have.text', '1 items left');
    cy.get('.filters a.selected').should('contain.text', 'All');
    cy.get('.clear-completed').should('be.visible');
  });
});
