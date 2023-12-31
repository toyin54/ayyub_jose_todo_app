const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  todo: { type: String, required: true },
  description: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  complete: { type: Boolean, required: false },
  dateCreated: { type: String, default: Date(Date.now()).toString() },
  dateCompleted: { type: Date, required: false },

});
//Export model
module.exports = mongoose.model("Post", PostSchema);