# AngularTodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Directory

```bash
API-Collections/         # Colección de endpoints del API
functions/               # API REST
src/app/
├── core/                # Servicios globales
│   ├── services/        # Servicios de autenticación y tareas
│   ├── models/          # Interfaces y modelos de datos
│   ├── guards/          # Guards de autenticación
├── modules/             # Módulos funcionales
│   ├── auth/            # Módulo de autenticación (Login)
│   ├── tasks/           # Módulo de tareas
│   ├── shared/          # Componentes reutilizables (modales, botones)
├── app-routing.module.ts
├── app.component.ts
├── app.module.ts
```

### tsconfig.json

Configuraciones adicionales para manejar alias:

```bash
{
  "compilerOptions": {
    // otras opciones...
    "baseUrl": "./",
    "paths": {
      "@services/*": ["src/app/core/services/*"],
      "@models/*": ["src/app/core/models/*"],
      "@components/*": ["src/app/components/*"],
      "@modules/*": ["src/app/modules/*"],
      "@shared/*": ["src/app/shared/*"],
      "@guards/*": ["src/app/core/guards/*"],
      "@environments/*": ["src/environments/*"],
    }
  }
}
```

```bash
 npx eslint src/controllers/auth.controller.ts
 npx eslint src/repositories/user.repository.ts
 npx eslint src/routes/auth.routes.ts
 npx eslint src/services/auth.service.ts


 npx eslint src/controllers/task.controller.ts
 npx eslint src/repositories/task.repository.ts
 npx eslint src/routes/task.routes.ts
 npx eslint src/services/task.service.ts
```

### Configuración Adicional

Se añaden configuraciones adicionales en el archivo **angular.json** para manejar los archivos environment dependiendo el entorno de desarrollo.

```bash
"configurations": {
  "production": {
    ...
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    ...
  }
}
```

### Deploy

```bash
firebase deploy
```

### Solo Hosting

```bash
firebase deploy --only hosting
```

### Solo Functions

```bash
firebase deploy --only functions
```

### Hosting URL

```bash
https://todo-app-7da59.web.app
```

### Firebase emulator

```bash
firebase emulators:start
```

### API Collections

```bash
API-Collection
```
