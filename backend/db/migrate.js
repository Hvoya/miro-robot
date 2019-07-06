const Postgrator = require('postgrator');

const config = process.env.NODE_ENV === 'production' ? require('./config').production : require('./config').development;

const postgrator = new Postgrator({
  migrationDirectory: __dirname + '/migrations',
  driver: 'pg',
  host: '127.0.0.1',
  port: 5432,
  database: config.database,
  username: config.username,
  password: config.password
})

module.exports = {
  do: () => {
    postgrator
      .migrate()
      .then(appliedMigrations => console.log(appliedMigrations))
      .catch(error => console.log(error));
  }
}