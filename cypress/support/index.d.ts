declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add a new todo.
     * @example cy.addTodo('Learn Cypress')
     */
    addTodo(text: string): Chainable<JQuery<HTMLLIElement>>;
  }
}
