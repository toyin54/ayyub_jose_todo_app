const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  todo: { type: String, required: true },
  descriptzion: { type: String, required: false },
  complete: { type: String, required: false },
  dateCompleted: { type: Date, required: false },
  dateCompleted: { type: Date, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});
//Export model
module.exports = mongoose.model("Post", PostSchema);