const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog_model");
const Comment = require("../models/comment");

const storae = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storae });

router.get("/add-new", (req, res) => {
  return res.render("addBlogs", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, description } = req.body;

  const blog = await Blog.create({
    title: title,
    description: description,
    image: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });

  console.log(blog);
  return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  return res.render("blog", {
    blog,
    user: req.user,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  console.log(req.body.comment);
  console.log(`/blog/${req.params.blogId}`);
  // await Comment.create({
  //   comment: res.body.comment,
  //   createdBy: req.user._id,
  //   blog: req.params.blogId,
  // });
  // console.log(`/blog/${req.params.blogId}`);
  // return res.redirect(`/blog/${req.params.blogId}`);
  return res.redirect("/");
});

module.exports = router;
