const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

const contactSchema = {
  firstName: String,
  lastName: String,
  email: String,
  message: String,
};

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/contactForm", (req, res) => {
  res.sendFile(__dirname + "/views/contactForm.html");
});

app.post("/form", (req, res) => {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;

  const newContact = new Contact({
    firstName: fName,
    lastName: lName,
    email: email,
    message: message,
  });

  newContact.save();

  res.send("Your message has been delieverd!");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening at port ${port}`);
  }
});
