const connectDB = require("./db/connect");
const { Router } = require("express");
const express = require("express");
const app = express();
const notfound = require("./middleware/not-found");
const errorHandler = require("./middleware/err-handler");
const task = require("./routes/tasks");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", task);
app.use(notfound);
app.use(errorHandler);

const port = process.env.PORT || 3001;
const StartServer = async () => {
  try {
    await connectDB(process.env.mongo_URL);
    app.listen(3000, console.log(`server listing on port ${port}`));
    console.log("Mongo DB Connected Succusfully ");
  } catch (error) {
    console.log(error);
  }
};
StartServer();
