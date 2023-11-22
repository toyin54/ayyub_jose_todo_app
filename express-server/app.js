var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
require('dotenv').config()
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./setupMongo")();

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use('/users', require("./routes/users"))

app.use(express.static(path.join(__dirname, '/client')));
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
module.exports = app;