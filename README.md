# Todos

A minimal Expo + React Native todo app using Expo Router and SQLite for local persistence.

## Quick overview

- Framework: Expo (React Native)
- Routing: `expo-router`
- Local DB: `expo-sqlite` (see `database/`)
- Languages: TypeScript + React

This README explains how to get the project running locally, where key files live, and how to run tests.

## Prerequisites

- Node.js (16+ recommended)
- npm or Yarn
- Expo CLI or use the bundled `expo` via the npm scripts
- Xcode (macOS) or Android Studio if you want to run on simulators/emulators

## Install

Install dependencies from the project root:

```bash
npm install
# or
yarn install
```

## Available scripts

The project's `package.json` includes these scripts (used with `npm run <script>` or `yarn <script>`):

- `start` — Start the Expo dev server (Metro) via `expo start`.
- `android` — Open the app on an Android device/emulator.
- `ios` — Open the app on an iOS simulator/device.
- `web` — Run the web build using `expo start --web`.
- `test` — Run Jest tests in watch mode.

Example:

```bash
npm run start
npm run ios      # macOS + Xcode
npm run android  # Android device/emulator
npm run web
npm run test
```

## Project structure (key files)

- `app/` — Expo Router app directory and screens.
  - `_layout.tsx`, `(tabs)/` and screen files like `todos.tsx`, `dones.tsx`.
- `components/` — Reusable UI components and hooks.
- `database/` — Local SQLite helpers, schema, and migrations.
  - `db.ts` — DB connection and helpers.
  - `schema.ts` — Table schema definitions.
  - `migrations.ts` — DB migration steps.
  - `db_schema.txt` — human-readable snapshot of the schema.
- `assets/` — Images, icons, and fonts.
- `package.json`, `tsconfig.json` — project config and scripts.

## Database details

This app uses `expo-sqlite` for local storage. Look at `database/db.ts` for connection code and `database/migrations.ts` for migration logic. If you need to reset the local DB during development, delete the app data from the simulator or remove the database file created by the app.

## Testing

Unit/UI tests use Jest with the `jest-expo` preset. Run them with:

```bash
npm run test
```

Add tests under `components/__tests__/` following existing patterns.

## Development notes

- This project uses the App Router from `expo-router`. Screens and layouts live under `app/` and use file-based routing.
- Fonts are loaded from `assets/fonts/` (see `SpaceMono-Regular.ttf`).
- The app includes platform-specific hooks/files (`useClientOnlyValue.ts`, `.web.ts`) for web vs native behavior.

## Building & EAS

This repo includes `eas-cli` as a dependency. For production builds with EAS, configure `eas.json` and run `eas build` per Expo docs.

## Contributing

1. Fork the repo and create a branch for your feature/fix.
2. Keep changes focused and add tests where relevant.
3. Open a PR against `main` with a short description of your changes.

## License

No license file is included in this repository. Add a `LICENSE` file if you want to make the project open source.

## Contact / Support

If something is unclear in the codebase, open an issue or reach out to the repository maintainer (RRMforLLM).
