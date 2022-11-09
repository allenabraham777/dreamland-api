module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE VIEW token_account_ledgers(
        account_id,
        entry_id,
        amount,
        date
      ) AS
        SELECT
          token_entries.credit,
          token_entries.id,
          token_entries.token,
          token_entries."createdAt"
        FROM
          token_entries
        UNION ALL
        SELECT
          token_entries.debit,
          token_entries.id,
          (0.0 - token_entries.token),
          token_entries."createdAt"
        FROM
          token_entries;
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(`DROP VIEW token_account_ledgers`);
  },
};
