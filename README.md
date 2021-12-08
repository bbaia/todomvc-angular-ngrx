# [TodoMVC](http://todomvc.com/) app using [Angular](https://angular.io/) & [NgRx](https://ngrx.io/) [![Build Status](https://circleci.com/gh/bbaia/todomvc-angular-ngrx.svg?style=shield)](https://circleci.com/gh/bbaia/todomvc-angular-ngrx)

Based on code from the GDG Toulouse talk "Redux with Angular & ngrx" in February 2018 (See [`bbaia/gdgtoulouse-ngrx`](https://github.com/bbaia/gdgtoulouse-ngrx)).

On the `master` branch, you'll find the code based on global store and the full NgRx stack (`@ngrx/store` & co).

On the [`component-store` branch](https://github.com/bbaia/todomvc-angular-ngrx/tree/component-store), you'll find a version based on component store (`@ngrx/component-store`), _the alternative to reactive push-based "Service with a Subject" approach_.

On the [`zoneless` branch](https://github.com/bbaia/todomvc-angular-ngrx/tree/zoneless), you'll find a version working without `Zone.js` using `@ngrx/component`, _a set of primitive reactive helpers to enable fully reactive, Zoneless applications_.

The sample is available at https://bbaia.github.io/todomvc-angular-ngrx/ using the `zoneless` version (~235kB)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run e2e:ci` to execute the end-to-end tests in a headless mode for executing tests in a CI environment.
