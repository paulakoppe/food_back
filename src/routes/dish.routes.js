const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const DishesImagesController = require("../controllers/DishesImagesController");


const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const imageDishController = new DishesImagesController();

const dishController = new DishesController();


dishRoutes.use(ensureAuthenticated);
dishRoutes.get('/', dishController.index)
dishRoutes.post("/", checkIsAdmin, dishController.create);
dishRoutes.get("/:id", dishController.show);
dishRoutes.delete("/:id", checkIsAdmin, dishController.delete);
dishRoutes.patch("/:id", checkIsAdmin, dishController.update);
dishRoutes.patch("/:id/image", upload.single("file"), imageDishController.upload)

module.exports = dishRoutes;