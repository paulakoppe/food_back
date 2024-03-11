const { response } = require("express");
const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    try {
      const { name, description, category, price, ingredients } = request.body;

     
      const [dish_id] = await knex("dishes").insert({
        name,
        description,
        category,
        price
      });


      if (ingredients && Array.isArray(ingredients)) {
        await knex("ingredients").insert(
          ingredients.map((ingredient) => ({
            dish_id,
            name: ingredient.name
          }))
        );
      }

      const completeDish = await knex("dishes")
        .select("*")
        .where("id", dish_id)
        .first();

      return response.status(201).json(completeDish);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Não foi possível criar o prato" });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const dish = await knex("dishes").where({ id }).first();
      const ingredients = await knex("ingredients")
        .where({ dish_id: id })
        .orderBy("name");

      return response.json({
        ...dish,
        ingredients,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro ao buscar o prato" });
    }
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
      dishes = await knex("dishes")
        .select("dishes.*")
        .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .whereIn("ingredients.name", filterIngredients)
        .whereLike("dishes.name",`%${name}%`)
        .groupBy("dishes.id")
        .orderBy("dishes.name")
    } else {
      dishes = await knex("dishes")
        .where("name", "like", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients");

    const serializedDishes = dishes.map(dish => {
      const dishIngredients = userIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients
      };
    });

    return response.json(serializedDishes);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, category, price, ingredients } = request.body;
    

    await knex("dishes").where({ id }).update({
      name,
      description,
      category,
      price
    });

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete();

      const insertIngredients = ingredients.map((ingredient) => {
        return {
          dish_id: id,
          name: ingredient.name
        };
      });

      await knex("ingredients").insert(insertIngredients);
    }

    return response.json({ message: "Prato atualizado com sucesso" });
  } 

  async delete(request, response) {
    const { id } = request.params;
    await knex("dishes").where({ id }).delete();

    return response.json({ message: "Prato deletado com sucesso" });
  }


}

module.exports = DishesController;
