const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const Blog = require("./models/blog_model");

const app = express();
const port = 3000;

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { authCheckWithCoockie } = require("./authentication/authentication");
app.use(express.static(path.resolve("./public")));

// Use express.urlencoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogApp")
  .then((e) => console.log("Mongoos Connectd"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
/// define all middleware below §
app.use(cookieParser());
app.use(authCheckWithCoockie("token"));
/// define all routes below
app.use("/user", userRouter);

app.use("/blog", authCheckWithCoockie("token"), blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  return res.render("home", {
    user: req.user,
    blogs:allBlogs
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
