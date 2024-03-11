exports.up = function(knex) {
    return knex.schema.createTable('ingredients', function(table) {
      table.increments('id');
      table.integer('dish_id').unsigned().references('id').inTable('dishes').onDelete("CASCADE");
      table.string('name').notNullable();
      table.integer("created_by").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ingredients');
  };