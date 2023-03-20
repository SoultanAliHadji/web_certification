import { Sequelize } from "sequelize";

const db = new Sequelize('travelspot_id', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
