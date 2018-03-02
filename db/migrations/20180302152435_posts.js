/* eslint-disable */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments('id')
    table.integer('user_id').references('users.id')
    table.text('decription')
    table
      .string('path_photo')
      .notNullable()
      .defaultTo('1.jpeg')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
