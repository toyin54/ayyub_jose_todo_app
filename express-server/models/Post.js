const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  complete: { type: String, required: false },
  dateCreated: { type: Date, required: false },
  dateCompleted: { type: Date, required: false },

});
//Export model
module.exports = mongoose.model("Post", PostSchema);