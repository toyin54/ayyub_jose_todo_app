const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const privateKey = ``;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const post = new Post({
    description: req.body.description,
    todo: req.body.inputTask,
    author: req.payload.id,
    complete: req.body.isChecked,
    dateCreated: req.body.Date(Date.now()).toString(),
    dateCompleted: req.body.selectedDate,

  });
  return post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        _id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
        description: savedPost.description,
        todo: savedPost.inputTask,
        complete: savedPost.isChecked,
        dateCreated: savedPost.dateCreated,
        dateCompleted: req.body.selectedDate,
        
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Something is went wrong." });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Post.find().where("author").equals(req.payload.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json({ posts: posts });
});

router.get("/:id", async function (req, res, next) {
  const post = await Post.findOne().where("_id").equals(req.params.id).exec();
  //const posts = await Post.find().exec();
  return res.status(200).json(post);
});


router.delete("/:id", async function (req, res) {
//   //console.log("In DELETE /post handler");
  Post.findByIdAndDelete(req.params.id)
    .where("author")
    .equals(req.payload.id)
    .then((post) => {
      if (post) {
        return res.status(200).json({
          id: post._id,
          title: post.title,
          content: post.content,});
        }}).catch((error) => { return res.status(500).json({ error: error.message });
    });
});

module.exports = router;