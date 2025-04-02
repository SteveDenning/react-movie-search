# Getting Started

This app currently uses Node version v20.17.0

Run `npm install`

You MUST make a local copy of the .env file before you run this application `cp .env.example .env`

Run `npm start`

Runs the app in the development mode. Open `http://localhost:3000` to view it in the browser.

# Environment variables

To add new environment variable create a variable in `.env.example` then copy over using `cp .env.example .env`

# Testing

`npm test` - Launches the test runner in the interactive watch mode.

`npm run test:coverage` - Launches the test runner that will output the test coverage for each file. This can be launched by opening the `index.html` in `coverage/lcov-report` folder once this has run.

# Build and deploying the App

`npm run build` - Builds the app for production to the `build` folder.

`npm run build:deploy` - Builds the app for productions then deploys to firebase hosting [NOTE] This also gets automatically run when merging to the main branch.

# Storybook

`npm run storybook` - runs Storybook locally and can be viewed here `http://localhost:6006/`

# react-movie-search resources and links

[TMDB documentation](https://developer.themoviedb.org/docs/getting-started).
[OMDB documentation](https://www.omdbapi.com/).
[OpenAI documentation](https://platform.openai.com/docs/overview).
