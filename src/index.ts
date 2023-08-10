import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import initRoutes from './routes/routes.js';
import addMockData from './helpers/mockData.js';
import sequelize from './database/db.js';

await sequelize.sync({ force: true });

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use('/', express.static('./client/build'));

app.listen(process.env.PORT || 3050, () => {});

addMockData();

export default app;
