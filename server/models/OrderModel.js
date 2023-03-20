import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "orders",
  {
    full_name: DataTypes.STRING,
    identity_number: DataTypes.BIGINT(16),
    phone_number: DataTypes.STRING,
    tourism_place: DataTypes.STRING,
    visit_date: DataTypes.DATEONLY,
    adult_visitor: DataTypes.INTEGER,
    child_visitor: DataTypes.INTEGER,
    ticket_price: DataTypes.STRING,
    total_price: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Order;

(async () => {
  await db.sync();
})();
