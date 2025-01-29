const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config()
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;


// parse option
app.use(express.json());
app.use(cors())

// routes
const blogRoutes = require("./src/routes/blog.route.js");
const commentRoutes = require("./src/routes/comment.route.js");
const userRoutes = require("./src/routes/auth.user.route.js")

app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);



async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.get("/", (req, res) => {
    res.send("Blog MERN");
  });
}

main()
  .then(() => console.log("Mongodb Connected Successfully!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Blog MERN");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
