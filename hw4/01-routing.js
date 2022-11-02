const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'cache',
  'cookie',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get('/welcome', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('<p>Welcome!!</p>');
});

app.get('/redirect', (req, res) => {
  res.status(302);
  res.redirect('/redirected');
  res.end();
});

app.get('/redirected', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('You have been redirected to this page');
  res.end();
});

app.get('/cache', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/plain', 'Cache-control': 'max-age=86400' });
  res.send('this resource was cached');
  res.end();
});

app.get("/cookie", (req, res) => {
  res.cookie("hello", "world");
  res.status(200);
  res.set({ "Content-Type": "text/plain", });
  res.send(`cookies... yummm`);
  res.end();
});

app.get(/^\/(.*)/, (req, res) => {
  res.status(404);
  res.set({ "Content-Type": "text/html" });
  res.send(`<h2>404 - Page Not Found<h2>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
