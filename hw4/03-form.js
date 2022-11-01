const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST request
app.post('/submit', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  if (req.body) {
    const { name, email, comments, signup } = req.body;

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
