const mongoose = require("mongoose");

mongoose.connect(process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "twilio",
});

module.exports = mongoose;
