const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
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
const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;