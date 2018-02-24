// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const listApiRouter = require('./server/routes/listApiRouter');
const oshaApi = require('./server/routes/oshaApi');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);

app.use('/api/lists', listApiRouter);
app.use('/api/osha/', oshaApi);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


// var client = require('twilio')(
//   'ACb27c1831f8a5e1593d10e9c93ec10ec6',
//   'eb77c0be4364d27a8406505aff6f9b6a'
// ); 


// client.messages.create({
//   from: 12169254386,
//   to: 2164077102,
//   body: "Sup dude!! OSHA IS ON THE JOB SITE"
// }).then((message) => console.log(message.sid))
// .catch(()=> console.log('failure'));


/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));