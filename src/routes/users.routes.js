const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

function middleware(request, response, next) {
  next();
}

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", middleware, usersController.create);

usersRoutes.put("/", ensureAuthenticated, usersController.update);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
