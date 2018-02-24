const express = require('express');
const oshaApi = express.Router();

var _ = require('underscore');
var storage = require('../../storage');

oshaApi.get('/', function(req, resp, next) {
console.log('this got called')  ;
    var client = require('twilio')(
      'ACb27c1831f8a5e1593d10e9c93ec10ec6',
      'eb77c0be4364d27a8406505aff6f9b6a'
    );
    
    
    client.messages.create({
      from: 12169254386,
      to: 2164077102,
      body: "Sup dude!! OSHA IS ON THE JOB SITE"
    }).then((message) => console.log(message.sid)).then(() => resp.send('oh yeaa'))
    .catch((err) => console.log(err));
    console.log('api works');

    // var result = storage.getAll('list');
    // if (result) {
    //   resp.json({ rows: result });
    // } else {
    //   resp.status(404).end();
    // }
    // resp.send('api works');
  });

  module.exports = oshaApi;