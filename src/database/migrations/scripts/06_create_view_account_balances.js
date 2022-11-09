module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE MATERIALIZED VIEW account_balances(
        id,
        amount_balance 
      ) AS
        SELECT
          accounts.id,
          COALESCE(sum(amount_account_ledgers.amount), 0.0)
        FROM
          accounts
          LEFT OUTER JOIN amount_account_ledgers
          ON accounts.id = amount_account_ledgers.account_id
        GROUP BY accounts.id;
        
        CREATE UNIQUE INDEX ON account_balances(id);

        CREATE FUNCTION update_balances() RETURNS TRIGGER AS $$
        BEGIN
          REFRESH MATERIALIZED VIEW account_balances;
          RETURN NULL;
        END
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER trigger_fix_balance_entries
        AFTER INSERT 
        OR UPDATE OF amount, credit, debit 
        OR DELETE OR TRUNCATE
        ON amount_entries
        FOR EACH STATEMENT
        EXECUTE PROCEDURE update_balances();

        CREATE TRIGGER trigger_fix_balance_accounts
        AFTER INSERT 
        OR UPDATE OF id 
        OR DELETE OR TRUNCATE
        ON accounts
        FOR EACH STATEMENT
        EXECUTE PROCEDURE update_balances();
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(
      `
      DROP MATERIALIZED VIEW if EXISTS account_balances;
      DROP TRIGGER if EXISTS trigger_fix_balance_accounts ON accounts;
      DROP TRIGGER if EXISTS trigger_fix_balance_entries ON amount_entries;
      DROP FUNCTION if EXISTS update_balances();
      `
    );
  },
};
