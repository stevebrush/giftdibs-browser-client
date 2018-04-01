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
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on port %d', port);
});
