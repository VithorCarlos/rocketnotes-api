const { Router } = require("express");
const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.listAll);

notesRoutes.post("/", notesController.create);

notesRoutes.get("/:note_id", notesController.show);

notesRoutes.delete("/:note_id", notesController.delete);

notesRoutes.put("/:note_id", notesController.update);


module.exports = notesRoutes;
