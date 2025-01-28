# Getting Started

This app currently uses Node version v20.17.0

Run `npm install` to install

You MUST make a local copy of the .env file before you run this application `cp .env.example .env`

Run `npm start`

Runs the app in the development mode. Open [Windows](http://localhost:3000) to view it in the browser.

# Environment variables

To add new variable create a new environment variable in `.env.example` then copy over using `cp .env.example .env`

# Testing

`npm test` - Launches the test runner in the interactive watch mode.\

`npm jest --coverage` - Launches the test runner that will output the test coverage for each file. This can be launched by opening the `index.html` in `coverage/lcov-report`

# Build and deploying the App

`npm run build` - Builds the app for production to the `build` folder.

`npm run build:deploy` - Builds the app for productions then deploys to firebase hosting [NOTE] This also get automatically run when merging to th main branch.

# Storybook

`npm run storybook` - runs Storybook locally and can be view [Windows](http://localhost:6006/)

`npm run chromatic` - builds and deploys Storybook and gives feedback on any new changes for review before final deployment to hosting.

[Storybook](storybook.sdenning.co.uk)

# react-movie-search resources and links

[TMDB documentation](https://developer.themoviedb.org/docs/getting-started).
[OpenAI documentation](https://platform.openai.com/docs/overview).
