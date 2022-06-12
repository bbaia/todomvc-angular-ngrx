declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add a new todo.
     * @example cy.addTodo('Learn Cypress')
     */
    addTodo(text: string): Chainable<JQuery<HTMLLIElement>>;
  }
}

function addTodo(text: string): Cypress.Chainable<JQuery<HTMLLIElement>> {
  const cmd = Cypress.log({
    name: 'add todo',
    message: text,
    consoleProps(): object {
      return {
        'Added Todo': text,
      };
    },
  });

  cy.get('.new-todo', { log: false }).type(`${text}{enter}`, { log: false });
  return cy
    .get('.todo-list', { log: false })
    .contains('li', text, { log: false })
    .then($li => {
      cmd.set({ $el: $li }).snapshot().end();
    });
}

Cypress.Commands.add('addTodo', addTodo);
