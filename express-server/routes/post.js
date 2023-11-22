const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const privateKey = process.env.JWT_PRIVATE_KEY;

const router = express.Router();

router.use(function (req, res, next) {
  // console.log("In post router");
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  //console.log("In POST /post handler", JSON.stringify(req));
  const post = new Post({
    todo: req.body.todo,
    author: req.payload.id,
    description: req.body.description,
    complete: req.body.complete,
    dateCreated: req.body.dateCreated,
    dateCompleted: req.body.dateCompleted,
  });
  post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        todo: savedPost.todo,
        description: savedPost.description,
        complete: savedPost.complete,
        dateCreated: savedPost.dateCreated,
        dateCompleted: savedPost.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});
//get request
router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts: posts });
});

// delete request
    router.delete("/:id", async function (req, res) {
      const _id = req.params.id;
      const userId = req.payload.id; 
    
      try {
        const todo = await Post.findById(_id);
        if (!todo) {
          return res.status(404).json({ message: "Todo not found." });
        }
        if (todo.author.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "Unauthorized to delete this todo." });
        }
    
        await Post.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Todo successfully deleted." });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
// toggle request
    router.patch("/:id", async function (req, res) {
      const _id = req.params.id;
      const userId = req.payload.id;
      const { completed } = req.body;
      let dataUpdate = {
        complete: completed
      };
    
      // 
      if (completed) {
        dataUpdate.complete = new Date();
      } else {
        dataUpdate.complete = null;
      }
    
      try {
        const post = await Post.findById(_id);
        if (!post) {
          return res.status(404).json({ message: "Post not found." });
        }
        if (post.author.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "Unauthorized to update this Post." });
        }
    
        const updatedTodo = await Post.findByIdAndUpdate(todoId, updateData, { new: true });
        return res.status(200).json({
          id: updatedTodo._id,
          title: updatedTodo.title,
          description: updatedTodo.description,
          author: updatedTodo.author,
          dateCreated: updatedTodo.dateCreated,
          complete: updatedTodo.complete,
          dateCompleted: updatedTodo.dateCompleted
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });


module.exports = router;