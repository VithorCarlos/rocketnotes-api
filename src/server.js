require("express-async-errors");
require("dotenv/config");
const runMigrations = require("./database/sqlite/migrations");
const express = require("express");
const AppError = require("./utils/appError");
const uploadConfig = require("./configs/upload");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

runMigrations();

app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  //erro gerado pelo client
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333

app.listen(3333, () =>
  console.log("server is runnig at port:" + PORT)
);
