const dbConfig = require("../../config/db-config.js");

const { Sequelize, DataTypes }  = require("sequelize");

// const signupController = require("../controller/Signup");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  password: dbConfig.PASSWORD,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize; // constructor
db.sequelize = sequelize; // the instance of Sequelize

db.users = require("./signupModel")(sequelize, DataTypes);

db.sequelize.authenticate()
.then(() => {
  console.log("Connected to DB");
  console.log(dbConfig.HOST, "HOST");
  return db.sequelize.sync({force: false});
})
// .then(async () => {
//   console.log("Adding users to DB");
//   await signupController.userCreation(db);
// })
.catch((err) => {
  console.log("Error", err);
})

module.exports = db;