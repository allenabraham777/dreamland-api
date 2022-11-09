module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE TABLE if NOT EXISTS amount_entries(
        id serial PRIMARY KEY,
        description VARCHAR(1024) NOT NULL,
        amount NUMERIC NOT NULL CHECK (amount > 0.0),
        credit INTEGER NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
        debit INTEGER NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      );
      CREATE INDEX ON amount_entries(credit);
      CREATE INDEX ON amount_entries(debit);
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(`DROP TABLE if EXISTS amount_entries`);
  },
};
