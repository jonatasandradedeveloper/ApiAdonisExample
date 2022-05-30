'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('type', 20).notNullable()
      table.string('password', 60).notNullable()
      table.string('zip_code', 20)
      table.string('city', 50)
      table.string('address', 100)
      table.string('district', 100)
      table.integer('number', 5)
      table.string('telephone', 15).unique()
      table.string('cpf', 18).unique()
      table.string('token')
      table.timestamp('token_created_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
