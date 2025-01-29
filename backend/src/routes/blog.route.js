const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.model.js");
const Comment = require("../model/comment.model.js");

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
    const comment = await Comment.find({postId: postId}).populate('user', 'username email' )
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
router.delete("/:id", async(req, res) =>{
  try {
    const postId = req.params.id;
    const post = await Blog.findByIdAndDelete(postId);

    if(!post){
      return res.status(404).send({message: "Post Not Found"})
    } 
    
    // deleted related comment
    await Comment.deleteMany({postId: postId})
    
    res.status(201).send({
      message: "Post Deleted Successfully!",
      post: post,
    });

  } catch (error) {
    console.error("Error Deleting post", error);
    res.status(500).send({ message: "Error Deleting post" });
  }
})

//releated Blog
router.get("/related:id", async(req, res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).send({message: "Post Id is required"})
    }
    const blog = await Blog.findById(id);

    if(!blog){
      return res.status(404).send({message: "Post Not Found"})
    }
    const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i')

    const releatedQuery = {
      _id: {$ne: id}, // exclude the current blog by id
      title: {$regex: titleRegex}
    }

    const releatedPost = await Blog.find(releatedQuery);
    res.status(200).send({message : "Related post Found!", post: releatedPost})
  } catch (error) {
    console.error("Error fetching related  post", error);
    res.status(500).send({ message: "Error fetching related  post" });
  }
})

module.exports = router;
