# task-list-node

Test assignment solution

A simple Node.js/Express Typescript application with a few REST endpoints.
This branch uses postgreSQL with sequelize-typescript instead of lowdb for data
storage and Yup for
schema validation. It also comes with Docker files to run in containers.

## Installation

Run commands (containerized):

```
docker compose up
```

OR

```
docker-compose up
```

&nbsp;

Run commands (non-containerized):

```
npm install
npm run build
npm run start
```

Open [http://localhost:3050](http://localhost:3050)