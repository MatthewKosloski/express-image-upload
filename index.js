const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/', require('./routes'));

// regular error middleware
app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// custom errors go here
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({message: err.message});
});

app.listen(port, () => {
	console.log('Listening at http://localhost:%s', port);
});	