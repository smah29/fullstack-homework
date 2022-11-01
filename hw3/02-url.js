const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  searchParams = url.search.substring(1);//removing ?
  let queries = {};
  searchParams && searchParams.split('&').forEach(
    function (queryPair) {
      let querySplit = queryPair.split('=');
      let key = typeof querySplit[0] === 'undefined' ? '' : querySplit[0];
      let val = typeof querySplit[1] === 'undefined' ? '' : querySplit[1];
      if (!key && !val) { }
      else {
        queries[key] = val;
      }
    }
  );

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  } else if (queries) {
    let result = '';
    for (const [key, value] of Object.entries(queries)) {
      result += `<tr><td style='border: 1px solid black;'>${key}</td>
                     <td style='border: 1px solid black;'>${value}</td>
                 </tr>`;
    }
    res.write(`<table style='border: 1px solid black;'> ${result} </table>`);
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
