const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/03-form.html");
});
// http://localhost:5001/submit should return all the data the user entered
app.post("/submit", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (req.body) {
    let name = req.body["name"];
    let email = req.body["email"];
    let comments = req.body["comments"];
    let signup = req.body["signup"];

    res.write(`<p>Name: ${name}<p>`);
    res.write(`<p>Email: ${email}<p>`);
    let feedback = comments === "" ? "n/a" : comments;
    res.write(`<p>Comments: ${feedback}<p>`);
    let checkBoxOutput =
      signup === "on"
        ? "Yes, sign me up for the newsletter."
        : "No, thank you.";
    res.write(`<p>Newsletter: ${checkBoxOutput}<p>`);
  }
  res.end();
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
