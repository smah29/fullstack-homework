const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const newHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>03 - Form</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    />
    <script defer src="../03-form.js"></script>
  </head>
  <body class="bg-dark">
    <form
      action="/submit"
      method="post"
      class="bg-light border rounded w-50 mx-auto mt-5 p-4"
    >
      <h1 class="mt-2 mb-4">Contact Form</h1>
      <div class="mb-3 form-group">
        <label for="name" class="col-4 col-form-label">Name <sup>*</sup></label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="caterina"
          required="required"
          class="border border-grey rounded px-2 py-1 col-12"
        />
      </div>
      <div class="mb-3 form-group">
        <label for="email" class="col-4 col-form-label"
          >Email <sup>*</sup></label
        >
        <input
          type="email"
          name="email"
          id="email"
          required="required"
          placeholder="catrina@pdx.edu"
          class="border border-grey rounded px-2 py-1 col-12"
        />
      </div>
      <div class="mb-3 form-group">
        <label for="message" class="form-label">Comments:</label>
        <textarea
          class="form-control"
          id="message"
          rows="3"
          name="comments"
          placeholder="Hello there!"
        ></textarea>
      </div>
      <section class="mb-3 form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="signup"
            id="tick"
          />
          <label class="form-check-label" for="tick"
            >Sign up for the newsletter</label
          >
        </div>
      </section>
      <div class="mb-3 row form-group mx-0">
        <input
          type="submit"
          class="btn btn-primary col-6 border-end"
          value="Submit"
        />
        <input
          type="reset"
          class="btn btn-secondary col-6 border-start"
          value="Reset"
        />
      </div>
    </form>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(302, { 'Location': '/form', 'Content-Type': 'text/html' });
        res.end();
    }
    else if (req.url === '/form') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(newHtml);
        res.end();
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
            let name = queries["name"];
            let email = queries["email"];
            let comments = queries["comments"];
            let signup = queries["signup"];

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