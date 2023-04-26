const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const routeSMS = require("./src/routes/sms");
const Sms = require("./src/models/sms");

const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.use("/api/sms", routeSMS, (req, res) => res.sendStatus(401));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
function sendTextMessage(numberFrom, numberTo) {
  return client.messages.create({
    body: "This is just a very basic use of Twilio SMS.",
    from: numberFrom,
    statusCallback: "http://postb.in/1234abcd",
    to: numberTo,
  });
}
app.post("/api/send", async (req, res) => {
  const { numberFrom, numberTo } = req.body;
  const payload = new Sms({ numberFrom, numberTo });
  await sendTextMessage(numberFrom, numberTo).then((res) => {
    payload
      .save()
      .then((message) => res.json(message))
      .catch((err) => res.json(500, err));
  });
});

const port = process.env.PORT || 3500;
app.listen(port);

console.log(`listening on ${port}`);
