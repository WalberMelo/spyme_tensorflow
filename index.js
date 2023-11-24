const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

let canSendEmail = true;

app.post("/detect", (req, res) => {
  const { message } = req.body;

  if (message === "Person detected!" && canSendEmail) {
    sendEmailNotification(req);
    canSendEmail = false;

    setTimeout(() => {
      canSendEmail = true;
    }, 600000); // 10 minutes cooldown before allowing the next email

    res.status(200).send("Email sent");
  } else {
    res.status(400).send("Invalid request");
  }
});
function sendEmailNotification(req) {
  // Use nodemailer to set up and send emails
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PW,
    },
  });

  let mailOptions = {
    from: process.env.GOOGLE_APP_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "Person detected!",
    text: "A person has been detected by the object recognition system.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
