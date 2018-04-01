const express = require('express');
const app = express();
const path = require('path');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('*', function (req, res) {
  const index = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(index);
});

const port = process.env.PORT || 8080;
const host = '0.0.0.0';
app.listen(port, host, function () {
  console.log('Listening on port %d', port);
});
