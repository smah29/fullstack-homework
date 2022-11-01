const http = require('http');
const static = require('node-static');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const file = new static.Server('./');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(302, { 'Location': '/form', 'Content-Type': 'text/html' });
    res.end();
  }
  else if (req.url === '/form') {
    file.serveFile('/03-form.html', 200, {}, req, res);
  }
  else if (req.url === '/submit') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let data = '';
    let queries = {};
    req.on('data', (chunk) => {
      data += chunk;
      const mySearchParams = new URLSearchParams(data);
      for (const [key, value] of mySearchParams) {
        queries[key] = value;
      }
    });
    req.on('end', () => {
      res.writeHead(200);
      // let name = queries["name"];
      // let email = queries["email"];
      // let comments = queries["comments"];
      // let signup = queries["signup"];

      let { name, email, comments, signup } = queries;
      res.write(`<p>Name: ${name}<p>`);
      res.write(`<p>Email: ${email}<p>`);
      let feedback = comments === "" ? "n/a" : comments;
      res.write(`<p>Comments: ${feedback}<p>`);
      let checkBoxOutput =
        signup === "on"
          ? "Yes, sign me up for the newsletter."
          : "No, thank you.";
      res.write(`<p>Newsletter: ${checkBoxOutput}<p>`);
      res.end();
    });
  }

});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});