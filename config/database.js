'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')
const JAWSDB_URL = new Url(Env.get('JAWSDB_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  // sqlite: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
  //   },
  //   useNullAsDefault: true,
  //   debug: Env.get('DB_DEBUG', false)
  // },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */

  // mysql: {
  //   client: 'mysql',
  //   connection: {
  //     host: Env.get('DB_HOST', JAWSDB_URL.host.replace(':3306', '')),
  //     port: Env.get('DB_PORT', JAWSDB_URL.port),
  //     user: Env.get('DB_USER', JAWSDB_URL.username),
  //     password: Env.get('DB_PASSWORD', JAWSDB_URL.password),
  //     database: Env.get('DB_DATABASE', JAWSDB_URL.pathname.substr(1))
  //   },
  //   debug: Env.get('DB_DEBUG', false)
  // },

  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.100.41'),
      port: Env.get('DB_PORT', '8000'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'backend'),
      database: Env.get('DB_DATABASE', 'backend')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  // pg: {
  //   client: 'pg',
  //   connection: {
  //     host: Env.get('DB_HOST', 'localhost'),
  //     port: Env.get('DB_PORT', ''),
  //     user: Env.get('DB_USER', 'root'),
  //     password: Env.get('DB_PASSWORD', ''),
  //     database: Env.get('DB_DATABASE', 'adonis')
  //   },
  //   debug: Env.get('DB_DEBUG', false)
  // }
}
