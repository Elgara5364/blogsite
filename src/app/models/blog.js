//schema model jika sukses dan failed

const { Schema, model, models } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, "Title should not be empty!"] },
    description: {
      type: String,
      required: [true, "Description should not be empty!"],
    },
    imageURL: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Blog = models.Blogs || model("Blogs", blogSchema);
