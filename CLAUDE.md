# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**Always use `yarn` instead of `npm`** for all commands in this repository (yarn@4.9.2).

## Common Commands

### Development

- `yarn install` - Install dependencies (run from project root)
- `yarn start` - Start the docs-site development server at http://localhost:5173
- `yarn build` - Full production build (JS + CSS in all formats)
- `yarn build-dev` - Development build with file watching

### Testing and Quality

- `yarn test` - Run the full test suite (Jest with ts-jest)
- `yarn test src/test/calendar_test.test.tsx` - Run a single test file
- `yarn test:watch` - Run tests in watch mode
- `yarn test:ci` - Run tests with coverage for CI
- `yarn lint` - Run both ESLint and Stylelint
- `yarn eslint` - Run ESLint on src directory
- `yarn sass-lint` - Run Stylelint on SCSS files
- `yarn type-check` - Run TypeScript type checking without emitting files
- `yarn prettier` - Format all JS/JSX/TS/TSX files
- `yarn prettier:check` - Check formatting without making changes

### Building Individual Pieces

- `yarn build:src` - Build JS using Rollup
- `yarn js:dev` - Build JS in watch mode
- `yarn css:prod` - Build minified production CSS
- `yarn css:dev` - Build expanded development CSS
- `yarn css:modules:prod` - Build CSS modules (minified)
- `yarn css:modules:dev` - Build CSS modules (expanded)

## Architecture Overview

### Component Hierarchy

The main entry point is `src/index.tsx` which exports the `DatePicker` component. The component hierarchy flows as follows:

```
DatePicker (index.tsx) - Main component, class-based
├── PopperComponent (popper_component.tsx) - Positioned calendar container
│   ├── withFloating HOC (with_floating.tsx) - Floating UI integration
│   ├── Portal (portal.tsx) - Optional portal rendering
│   └── TabLoop (tab_loop.tsx) - Keyboard navigation wrapper
│       └── Calendar (calendar.tsx) - Core calendar logic
│           ├── ClickOutsideWrapper - Handles outside clicks
│           ├── Month/Year/Time components - Date selection UI
│           └── Various dropdowns for date navigation
```

### Key Architectural Patterns

**Positioning System**: The datepicker uses `@floating-ui/react` (v0.27.15) for positioning the calendar relative to the input. The `withFloating` HOC wraps `PopperComponent` to provide positioning logic.

**Date Utilities**: All date manipulation goes through `date_utils.ts`, which wraps `date-fns` (v4.1.0). This provides a consistent API across the codebase and makes it easier to maintain date-related logic.

**State Management**: The main `DatePicker` component is class-based and manages state internally. Most child components are controlled components that receive props and callbacks.

**Styling**: SCSS source files live in `src/stylesheets/`. The build process generates multiple CSS outputs:

- Regular CSS: `react-datepicker.css` (dev) and `react-datepicker.min.css` (prod)
- CSS Modules: `react-datepicker-cssmodules.css` and `react-datepicker.module.css`

### Build Output

Rollup (configured in `rollup.config.mjs`) generates multiple bundle formats in the `dist/` directory:

- **UMD**: `react-datepicker.js` and `react-datepicker.min.js` (browser)
- **CommonJS**: `index.js` (Node/bundlers)
- **ES Modules**: `index.es.js` (modern bundlers)
- **Types**: `index.d.ts` (TypeScript definitions)

### Testing Architecture

Tests use Jest with `@testing-library/react` and are located in `src/test/`. The test setup:

- Configuration: `jest.config.js`
- Setup file: `src/test/index.ts`
- Helper components: `src/test/helper_components/`
- Coverage is collected and reported to Codecov

**Important for tests**: Some components use ShadowDOM for testing. The `shadow_root.tsx` helper uses `flushSync` to ensure synchronous updates required by tests.

### Floating UI Integration Notes

The codebase uses `@floating-ui/react` for positioning. **Important**: The Floating UI library requires refs and context to be accessed during render, which is by design. When fixing linting errors:

- Use `eslint-disable` comments for Floating UI ref accesses (e.g., `popperProps.refs.setFloating`, `popperProps.context`, `arrowRef`)
- These are **not** violations of React best practices—they're intentional library usage
- See `popper_component.tsx` and `with_floating.tsx` for examples

### React Hooks Rules

This codebase uses `eslint-plugin-react-hooks` v7.0.1+ which has strict rules about:

- **Ref access during render**: Generally not allowed, but see Floating UI exception above
- **setState in effects**: Avoid calling setState directly in effects; use `flushSync` when synchronous updates are needed
- When refs must be updated based on props, do it in `useEffect`, not during render

## Development Workflow

### Local Development Setup (Full)

1. Install node >=16.0.0 and yarn >=4.6.x
2. `yarn install` from project root
3. `yarn build` from project root (generates dist/ directory)
4. `yarn start` to launch docs at http://localhost:5173
5. In a new terminal, run `yarn build-dev` to auto-rebuild on changes

**Note**: The docs-site uses a portal: dependency (`"react-datepicker": "portal:../"`) which links to the parent project. Changes to the main package are reflected in the docs when you rebuild.

### Alternative Setup with yarn link (from CONTRIBUTING.md)

If you need tighter integration during development:

1. Run `yarn link` from project root
2. Run `cd docs-site && yarn link react-datepicker`
3. Then follow steps above

### Quick Development Workflow

After initial setup, when making changes:

- **JS/TS changes**: Changes auto-rebuild if `yarn build-dev` is running
- **SCSS changes**: Run `yarn run css:dev && yarn run css:modules:dev`

### Pre-commit Hooks

The repo uses Husky with lint-staged. On commit:

- Prettier formats staged files automatically
- Files are automatically added to the commit (via `git add` in lint-staged config)

## Dependencies

### Core Runtime Dependencies

- `react` and `react-dom` (^16.9.0 || ^17 || ^18 || ^19) - peer dependencies
- `date-fns` (^4.1.0) - Date manipulation library
- `@floating-ui/react` (^0.27.15) - Positioning engine
- `clsx` (^2.1.1) - Conditional className utility

### Important Dev Tools

- **Build**: Rollup with Babel and TypeScript plugins
- **Testing**: Jest, ts-jest, @testing-library/react, jest-axe
- **Linting**: ESLint 9, TypeScript ESLint, Stylelint
- **Formatting**: Prettier 3.4.2
- **CSS**: Sass 1.93.2

## Code Conventions

- **Prettier handles all code formatting** - don't worry about tabs vs spaces
- **ESLint enforces coding standards** - run `yarn lint` before committing
- **TypeScript strict mode** - the codebase is fully typed
- **Tests are required** - add Jest tests for new functionality
- **Accessibility matters** - maintain ARIA attributes and keyboard navigation
