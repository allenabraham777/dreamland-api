module.exports = {
  up: function (database, Sequelize) {
    return database.sequelize.query(
      `
      CREATE MATERIALIZED VIEW token_balances(
        id,
        token_balance 
      ) AS
        SELECT
          accounts.id,
          COALESCE(sum(token_account_ledgers.amount), 0.0)
        FROM
          accounts
          LEFT OUTER JOIN token_account_ledgers
          ON accounts.id = token_account_ledgers.account_id
        GROUP BY accounts.id;
        
        CREATE UNIQUE INDEX ON account_balances(id);

        CREATE FUNCTION update_token_balances() RETURNS TRIGGER AS $$
        BEGIN
          REFRESH MATERIALIZED VIEW token_balances;
          RETURN NULL;
        END
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER trigger_fix_balance_token_entries
        AFTER INSERT 
        OR UPDATE OF token, credit, debit 
        OR DELETE OR TRUNCATE
        ON token_entries
        FOR EACH STATEMENT
        EXECUTE PROCEDURE update_token_balances();

        CREATE TRIGGER trigger_fix_balance_token_accounts
        AFTER INSERT 
        OR UPDATE OF id 
        OR DELETE OR TRUNCATE
        ON accounts
        FOR EACH STATEMENT
        EXECUTE PROCEDURE update_token_balances();
      `
    );
  },
  down: function (database, Sequelize) {
    return database.sequelize.query(
      `
      DROP MATERIALIZED VIEW if EXISTS token_balances;
      DROP TRIGGER if EXISTS trigger_fix_balance_token_accounts ON accounts;
      DROP TRIGGER if EXISTS trigger_fix_balance_token_entries ON token_entries;
      DROP FUNCTION if EXISTS update_token_balances();
      `
    );
  },
};
