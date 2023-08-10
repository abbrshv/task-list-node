import cors from 'cors';
import express from 'express';
import initRoutes from './routes/routes.js';
import addMockData from './helpers/mockData.js';
import sequelize from './database/db.js';

await sequelize.sync({ force: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use('/', express.static('./client/build'));

const port = 3050;
app.listen(port, () => {});

addMockData();

export default app;
