const mongoose = require("../db");

const message = new mongoose.Schema({
  numberFrom: { type: String, required: true },
  numberTo: { type: String, required: true },
});

const Sms = mongoose.model("message", message);

module.exports = Sms;
