# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

This website contains structured notes taken during my CDA (Concepteur Développeur d’Applications) training.

## What you will find here

- Java and object-oriented programming concepts
- Web fundamentals (HTTP, REST, APIs)
- Databases and SQL
- Framework notes and best practices
- Code examples and explanations

> The goal is to keep concepts clear, concise, and easy to revisit.

This notebook is a living project and will evolve throughout my training and future professional experience.

## Installation

```bash
npm i
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
