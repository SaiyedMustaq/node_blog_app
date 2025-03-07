const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId, // table is for user
      ref: "user", ///Table is where you wont to ref
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = model("blog", blogSchema);
module.exports = Blog;
