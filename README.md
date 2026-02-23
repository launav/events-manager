# AppEventsManager

Aplicación web para la gestión y visualización de eventos desarrollada con **Angular 19**. AppEventsManager permite a los usuarios explorar un catálogo de eventos, filtrar por diferentes criterios, ver detalles de cada evento y recibir actualizaciones en tiempo real gracias a la integración con **Socket.io**.

## Características principales

- **Catálogo de eventos**: Visualización de eventos con información completa (título, categoría, fecha, ubicación, descripción, aforo)
- **Filtrado avanzado**: Buscar y filtrar eventos por:
  - Categoría (Taller, Conferencia, Networking, Concierto)
  - Rango de fechas
  - Búsqueda por texto
- **Detalles del evento**: Acceso a información detallada de cada evento
- **Actualizaciones en tiempo real**: Sincronización automática de cambios en eventos mediante Socket.io
- **Diseño responsivo**: Interfaz adaptada a diferentes dispositivos

## Tecnologías utilizadas

- **Angular 19**: Framework de desarrollo web
- **TypeScript 5.7**: Lenguaje de programación
- **RxJS**: Manejo de operaciones asincrónicas
- **Socket.io-client**: Comunicación en tiempo real
- **Jasmine/Karma**: Testing unitario

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.20.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
