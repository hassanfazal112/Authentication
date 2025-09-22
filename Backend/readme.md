# Node.js TypeScript Backend Skeleton

A production-ready Node.js backend boilerplate with TypeScript, featuring essential security, authentication, and database integrations.

## Features

- Express server with security middlewares (Helmet, CORS, rate limiting)
- MongoDB integration with Mongoose
- Winston logging & Morgan request logging
- Validation with Joi
- Jest testing with coverage reports
- TypeScript + Live reload (tsc-watch)
- ESLint + Prettier code quality

## Getting Started

- npm install
- npm run build
- npm run dev (Start development server) Can't execute if you haven't create an initial build yet.
- npm start (Start production server)

## Key Scripts

Command Description

- npm run dev Development mode with live reload
- npm test Run tests with coverage
- npm run lint Check code quality
- npm run build Compile TypeScript to JavaScript
- npm run prettier Format code

## Project Structure

```bash
src/
├── config/ # Environment variables and configuration setup
├── constants/ # Application-wide constant values (error messages, config values)
├── controllers/ # Request handlers for API endpoints
├── middlewares/ # Custom Express middleware functions
├── models/ # MongoDB schema definitions (Mongoose models)
├── routes/ # Express route definitions and endpoint mappings
├── services/ # External service integrations (AWS, SendGrid, etc.)
├── tests/ # Jest test suites and test cases
├── types/ # Custom TypeScript type declarations and interfaces
├── utils/ # Reusable utility functions and helpers
├── validations/ # Data validation schemas (Joi validation rules)
└── index.ts # Server entry point and initialization
```
