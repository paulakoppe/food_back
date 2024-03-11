const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesImagesController {
  async upload(request, response) {
    const { filename } = request.file;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new Error("Dish not found");
    }

    const diskStorage = new DiskStorage();

    const image = await diskStorage.saveFile(filename);

    dish.image = image;

    await knex("dishes").where({ id }).update({
      image,
    });

    return response.json({ message: "Imagem adicionada com sucesso" });
  }

  async list(request, response ){
    const { image, id } = request.params

    
  }

}

module.exports = DishesImagesController;
