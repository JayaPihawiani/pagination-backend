import { Sequelize } from "sequelize";

const db = new Sequelize("paginatingdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
