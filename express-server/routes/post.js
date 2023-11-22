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
    title: req.body.title,
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
        title: savedPost.title,
        description: savedPost.description,
        author: savedPost.author,
        complete: savedPost.complete,
        dateCreated: savedPost.dateCreated,
        dateCompleted: savedPost.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  //console.log("In GET /post handler");
  Post.find()
    .where("author")
    .equals(req.payload.id)
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// router.put

router.delete("/:id", async function (req, res) {
  Post.find()
    .where("author")
    .equals(req.payload.id)
    .then((post) => {
      if (post) {
        return res.status(200).json({
          id: post._id,
          title: post.title,
          description: post.description,});
        }}).catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    });
module.exports = router;