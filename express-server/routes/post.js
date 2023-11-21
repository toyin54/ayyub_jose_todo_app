const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAkIdZo4dz6DN6w5J158CIgZPVye5Vo5QeJTFVy4EFiWpiFycM
UAJkuZ2hdEjnqKWW0jSayDkQV8XrRDyDS2WP0kPTdfzAMyT0LFzbpd2CkCCAhszr
Jkj34m0X7RwLRYbVIgZvTvlWWH085c15HCdZ2aDvtCHoxOigyeA2SF0J0e4UvVwK
XPNXt9gyrSmvGB7gHtIaZQzzQj/45k1Gh721ugzxLMHi/uoyRO73cmrkRi4/jCn8
LhabyGd8MKeNA7Z43G9T7JfF8g66zKzEBtyrKQFYNdCo/VXpHFEgXP+SQ4eVqCQ0
hFOgQ+//v3UWr6OavcOZpCB+6o/LrYsU/CoajwIDAQABAoIBAGEKL9qHoQBASGY1
2WqAsGboPvw1RVTup4rrZCKef3wzbKcE9dRmtwCV4Qj1xm1KuUhsP5y+C8YTQpLv
WmxuRbG1Dq9CxD3SywtaUbQ9VWO2HvXjcuOizKVAAHeYg8zr6gDNd0D8UshZVmEp
o+6OUVq5HxjAR8ymMQc6vte5eFV10gS2PEdYs/IyC/JqyaKbj5lfpp6BCChgrV9G
IW9/eTp9u1ZLWUdOtS43kP8UbtTtSu93iFrKo8Q+gNxz8J7sJ5F4RaJCDaY6wGmr
GFkLZZR3PXTA3NzDKiStI++4YUr/PfBYqgWxosQRYLqihWbEtZjEppypYwjpfIxW
A+xqRnkCgYEA5jkQ2w0AtgJkku5cTEi8Js47MVmIEFrpxTpjKCv/7TrrBIRcfqxm
rFhEp6HJ7Ewz5kSi4YHAoC8k6zBHjwqBRKNQXyi+ssKvqml5FuYbIecNGt+W41Pt
vEBMMsrvDZclS+rV6NF7iod+kXTtBGBoKlwnwFrKjB4ErBoXXCHtbrMCgYEAoLYC
0UOwl6CN4Pu3TqM1xkP8mXTwe4B0uq3ptQwGzcYHPUBdP91AJQAoBW/HEeGH5u6n
DPnqg3BWDi1b9ztArH8TLKu9qX3fy9WHr1x1qC+PLGm1I/bjVppdKC+A6vQjK9gi
SyxE4XEXHeCs69E92G352DJcfsXucR/6NFmU0rUCgYEAo23hLE8HsSzzrmYs+S4s
+rMty/ONpmaTSqIPH8ZUUFih2zwG2RmTbUbfvcwZJnhV42HX6pOMZWnyIE7OjZlc
eJgihtrKvOV9hFCJWBsTKbb2U5xjZY7/1cIjFW9/0br5C/Jx1WtX8tgKnkFNu+yg
JWn0AhWxcVQh5vZCnPGstgcCgYA7r92UAuPPLJ4E9Pe7iPorzIxAIiI+fBLeUkD+
MJ1GR0nhAcqgMXflRg2XF1CD35MtvWzlcNwcPNh5I3eIdsUqS3e/m3kxPcKkXYWr
J1e7Qw6VnBzeYo9EVshKaHokyM9XNUpnSOW8JNhFDHCslGW3wACOvwWDP9eyxAGU
98BCEQKBgGZuIeCa2aaJsK36kU20TxhcnQMdeiQ1KpZMB0PPw5eGDRkACN85Cc+U
QaKNKsx4DsVJ0YWpagm99Y1QXiSoTJDbLPwOtCCPgvh+XHgn2/bAV92OCWxcae3y
LnRJ5A9s3HVJth+VzAq8mHCt685H0xTdBBd6XoUP2eLQeEnWV4Cu
-----END RSA PRIVATE KEY-----
`;

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