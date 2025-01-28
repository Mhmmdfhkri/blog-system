const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.model.js");

// create a blog post
router.post("/create-post", async (req, res) => {
  try {
    // console.log("Blog Data From API :", req.body)
    const newPost = new Blog({ ...req.body });
    await newPost.save();
    res.status(201).send({
      message: "Post Created Successfully!",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).send({ message: "Error Creating a Post" });
  }
});
// get All Blogs
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;
    console.log(search);

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (location) {
      query = {
        ...query,
        location,
      };
    }

    const post = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).send({
      message: "All Posts Retrieved Successfully!",
      post: post,
    });
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).send({ message: "Error Creating a Post" });
  }
});

// get Single Blog By ID
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post Not Found" });
    }
    // todo: with also fetch comment releated to the post
    res.status(200).send({
      message: "post Retrieved successfully",
      post: post,
    });
  } catch (error) {
    console.error("Error Fatching Single post", error);
    res.status(500).send({ message: "Error Fatching Single post" });
  }
});

// update a Blog Post
router.patch("/update-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(201).send({
      message: "Post Updated Successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error Updating post", error);
    res.status(500).send({ message: "Error Updating post" });
  }
});

// delete a Blog
router.delete("/")

module.exports = router;
