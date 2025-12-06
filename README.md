# Profession Link

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A full-stack application connecting professionals, built with a Node.js, Express, and TypeScript backend, and a frontend. This project provides a platform for users to network and showcase their professional profiles.

![Preview](https://raw.githubusercontent.com/leightongrant/profession-link-step8up/main/screenshot.webp)

## Live demo

[![Live demo](https://img.shields.io/badge/Live%20Demo-View-brightgreen?style=for-the-badge)](https://profession-link-step8up.vercel.app/)

## Overview

This project is a full-stack application that serves as a professional networking platform. The backend exposes several endpoints to manage user profiles and connections.

- **API Entry:** `server.ts` sets up and runs the Express server.
- **Routing:** `routes.ts` defines the API endpoints for note operations.
- **Data Storage:** Data is persisted in a local JSON file.
- **Validation:** Incoming request data is validated using Joi.

## Features

- Responsive and robust RESTful API structure.
- Full CRUD (Create, Read, Update, Delete) functionality.
- Schema validation for incoming data to ensure integrity.
- Data is stored in a simple, human-readable JSON file.

## Tech stack

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

### Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![CoreUI](https://img.shields.io/badge/CoreUI-321FDB?style=for-the-badge&logo=coreui&logoColor=white)](https://coreui.io/)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

## Quick start

1.  Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

The API will be running at `http://localhost:3000`.

## Project structure (high level)

- `server.js` — Main Express server setup.
- `routes/` — API route definitions.
- `public/` — Folder for static assets.
- `frontend/` — Contains the React frontend application.
- `LICENSE` — Project license (MIT).

## Contributing

Small improvements are welcome: accessibility fixes, responsive tweaks, copy updates, or additional projects. Please open an issue or submit a pull request.

### Contributors

A huge thanks to all the people who contributed to this project:

[![Spiritsword](https://img.shields.io/badge/GitHub-Spiritsword-blue?logo=github)](https://github.com/Spiritsword)
[![smallFledging](https://img.shields.io/badge/GitHub-smallFledging-blue?logo=github)](https://github.com/smallFledging)
[![karenkirgin](https://img.shields.io/badge/GitHub-karenkirgin-blue?logo=github)](https://github.com/karenkirgin)

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

## Contact

For questions or feedback, you can reach the author by opening an issue in this repository.
