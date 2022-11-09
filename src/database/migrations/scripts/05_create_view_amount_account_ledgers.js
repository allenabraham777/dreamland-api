module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE VIEW amount_account_ledgers(
        account_id,
        entry_id,
        amount,
        date
      ) AS
        SELECT
          amount_entries.credit,
          amount_entries.id,
          amount_entries.amount,
          amount_entries."createdAt"
          FROM
          amount_entries
          UNION ALL
          SELECT
          amount_entries.debit,
          amount_entries.id,
          (0.0 - amount_entries.amount),
          amount_entries."createdAt"
        FROM
          amount_entries;
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(`DROP VIEW amount_account_ledgers`);
  },
};
