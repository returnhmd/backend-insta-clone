/* eslint-disable */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table
      .string('email')
      .notNullable()
      .unique()
    table.string('full_name').notNullable()
    table
      .string('username')
      .unique()
      .notNullable()
    table.string('password').notNullable()
    table
      .string('path_photo')
      .notNullable()
      .defaultTo('1.jpeg')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
