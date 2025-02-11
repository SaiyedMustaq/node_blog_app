const express = require("express");
const mongoose = require("mongoose");
path = require("path");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
app.use(express.urlencoded({ extendeda: false }));
mongoose
  .connect("mongodb://127.0.0.1:27017/blogApp")
  .then((e) => console.log("Mongoos Connectd"));
app.use("/user", userRouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", (req, res) => res.render("home"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
