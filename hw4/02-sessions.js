const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(session({
  store: new session.MemoryStore(),
  secret: 'a secret to store the routes the user is visiting',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
  },
}));

app.use('/', (req, res) => {
  res.status(200);
  res.set({
    "Content-Type": "text/html",
  });
  let url = new URL(req.url, `http://${req.headers.host}`);
  if (req.url !== "/favicon.ico") {
    if (req.session.pages === undefined) {
      req.session.pages = [];
      req.session.pages.push(req.url);
      res.write(`<p>Currently on route: ${req.url}</p>`);
      res.write(`<p>Welcome to ${url.origin}${req.url}`);
    } else {
      req.session.pages.push(req.url);
      res.write(`<p>Currently on route: ${req.url}</p>`);
      res.write(`<p style = "margin-bottom:0">Previously visited:</p>`)
      res.write(`<ul style = "list-style-type:none;margin-top:0">`);
      let result = ``;
      req.session.pages.forEach(
        (elem) => (result += `<li>${elem}</li>`)
      );
      res.write(result);
      res.write(`</ul>`);
    }
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
