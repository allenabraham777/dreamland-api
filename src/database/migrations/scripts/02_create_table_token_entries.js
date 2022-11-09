module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE TABLE IF NOT EXISTS token_entries(
        id serial PRIMARY KEY,
        description VARCHAR(1024) NOT NULL,
        token NUMERIC NOT NULL CHECK (token > 0.0),
        credit INTEGER NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
        debit INTEGER NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      );
      CREATE INDEX ON token_entries(credit);
      CREATE INDEX ON token_entries(debit);
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(`DROP TABLE if EXISTS token_entries`);
  },
};
