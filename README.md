# Angular Boilerplate

A comprehensive Angular 17 boilerplate project with Material Design, authentication, and modular architecture.

## 🚀 Features

- **Angular 17** with latest features and optimizations
- **Angular Material** UI components with Deep Purple/Amber theme
- **Modular Architecture** with lazy-loaded modules
- **Authentication** module with JWT support
- **Responsive Layout** with sidebar navigation
- **Shared Components** for reusable UI elements
- **TypeScript** with strict configuration
- **SCSS** for styling
- **Jasmine/Karma** for testing

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/           # Feature modules (lazy-loaded)
│   │   ├── auth/         # Authentication module
│   │   ├── dashboard/    # Dashboard module
│   │   ├── mapping/      # Mapping module
│   │   ├── account/      # Account module
│   │   └── misc/         # Miscellaneous module
│   ├── shared/           # Shared components and utilities
│   │   ├── components/   # Reusable components
│   │   ├── elements/     # Base UI elements
│   │   ├── guards/       # Route guards
│   │   ├── services/     # Shared services
│   │   └── utilities/    # Utility functions
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
├── assets/               # Static assets
├── environments/         # Environment configurations
└── styles.scss          # Global styles
```

## 🛠️ Technologies

- **Frontend**: Angular 17, TypeScript, SCSS
- **UI Framework**: Angular Material 17
- **Charts**: @swimlane/ngx-charts
- **HTTP**: Angular HTTP Client
- **Authentication**: @auth0/angular-jwt
- **Layout**: Angular Flex Layout
- **Date/Time**: Moment.js
- **Testing**: Jasmine, Karma

## 📦 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run start
# or
npm run dev

# Build for development
npm run build

# Build for production
npm run build --configuration=production

# Run tests
npm test

# Watch mode for development
npm run watch
```

## 🏗️ Development Commands

### Generate New Module with Routing
```bash
ng g m [module-name] --module app --route [module-name] 
```

### Build Configurations
```bash
# Development build
ng build --configuration=development

# Production build
ng build --configuration=production

# Development server
ng serve --configuration=development
```

## 🌐 Routes

- `/` - Redirects to `/auth`
- `/auth` - Authentication module
- `/dashboard` - Dashboard module
- `/mapping` - Mapping module
- `/account` - Account module
- `/server` - Miscellaneous module
- `/**` - Redirects to 404 page

## 🔧 Configuration

- **Angular CLI**: 17.3.6
- **Node**: Compatible with Angular 17 requirements
- **Default Port**: 4200 (development)
- **Build Output**: `dist/angular-boilerplate`

## 📋 Key Dependencies

### Core Angular
- @angular/core ^17.3.0
- @angular/material ^17.3.6
- @angular/cdk ^17.3.6

### Additional Libraries
- @auth0/angular-jwt ^5.2.0
- @swimlane/ngx-charts ^20.5.0
- moment ^2.30.1
- @angular/flex-layout ^15.0.0-beta.42

## 🚀 Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to start the development server
4. Open `http://localhost:4200` in your browser

## 📝 Notes

- This boilerplate uses lazy loading for better performance
- Material Design components are pre-configured
- Shared module contains reusable components and utilities
- Environment configurations for development and production builds