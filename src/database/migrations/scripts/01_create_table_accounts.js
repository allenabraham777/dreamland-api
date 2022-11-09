module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE TABLE if NOT EXISTS accounts(
      id serial PRIMARY KEY,
      email VARCHAR(256) NOT NULL UNIQUE,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now()
      );
      CREATE INDEX ON accounts(email);
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(`DROP TABLE if EXISTS accounts`);
  },
};
