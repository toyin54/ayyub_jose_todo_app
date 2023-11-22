const mongoose = require("mongoose");
const uri =process.env.DB_URI

"mongodb+srv://ajose3:IxkBjtt7mYpnoXtx@todo.ngdir5e.mongodb.net/?retryWrites=true&w=majority";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;