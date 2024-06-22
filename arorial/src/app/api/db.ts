import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    benchmark: true,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");

        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})();
export default sequelize;
