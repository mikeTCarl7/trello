const express = require('express');
const listApiRouter = express.Router();

var _ = require('underscore');

/* GET api listing. */
// listApiRouter.get('/', (req, res) => {
//   res.send('api works');
// });
var storage = require('../../storage');

function isValid(entity, obj) {
  if (! _.isUndefined(obj.id) && ! _.isFinite(obj.id)) {
    console.log('Id validation failed', obj.id);
    return false;
  }

  return _.all(_.pairs(entity).map(function(item) {
    var name = item[0], validate = item[1];
    var ret = validate(obj[name]);
    if (! ret) {
      console.log('Validation failed for field %s, value: %s', name, obj[name]);
    }
    return ret;
  }));
}

var LIST_FIELDS = {
  name: function(name) {
    return name && _.isString(name) && name.length;
  },
  pos: _.isNumber,
  cards: function(cards) {
    return ! cards || (_.isArray(cards) && _.all(cards, _.isString));
  }
};

var LIST_FIELDS_FOR_UPDATE = {
  name: function(name) {
    return name && _.isString(name) && name.length;
  },
  pos: _.isNumber,
  cards: function(cards) {
    return ! cards || (_.isArray(cards) && _.all(cards, _.isString));
  },
  id: _.isNumber
};

function getFields(entity, obj) {
  return _.pick(obj, function(v, k) {
    return _.has(entity, k);
  });
}

// GET /api/lists Get all lists
listApiRouter.get('/', function(req, resp, next) {
  
  // var client = require('twilio')(
  //   'ACb27c1831f8a5e1593d10e9c93ec10ec6',
  //   'eb77c0be4364d27a8406505aff6f9b6a'
  // );
  
  
  // client.messages.create({
  //   from: 12169254386,
  //   to: 2164077102,
  //   body: "Sup dude!! OSHA IS ON THE JOB SITE"
  // }).then((message) => console.log(message.sid));
  var result = storage.getAll('list');
  if (result) {
    resp.json({ rows: result });
  } else {
    resp.status(404).end();
  }
  // resp.send('api works');
});

// GET /api/lists/:id Get one list
listApiRouter.get('/:id', function(req, resp, next) {
    var result = storage.getOne('list', parseInt(req.params.id));
    if (result) {
      resp.json(result);
    } else {
      resp.status(404).end();sa
    }
});

listApiRouter.get('/osha', function(req, resp, next){
console.log('this got called');
var result = storage.getOne('list', parseInt(0));
    if (result) {
      resp.json(result);
    } else {
      resp.status(404).end();
    }

});

// POST /api/lists create new list
listApiRouter.post('/', function(req, resp, next) {
  var fields = getFields(LIST_FIELDS, req.body);
  fields.pos = parseInt(fields.pos);
  if (! isValid(LIST_FIELDS, fields)) {
    resp.status(400).end();
  } else {
    console.log('Create list', fields);
    resp.json(storage.upsert('list', fields));
  }
});

// POST /api/lists/:id Update existsing list
listApiRouter.post('/:id', function(req, resp, next) {
  console.log(req.params.id)
  var fields = getFields(LIST_FIELDS_FOR_UPDATE, req.body);
  fields.pos = parseInt(fields.pos);
  if (! isValid(LIST_FIELDS_FOR_UPDATE, fields)) {
    resp.status(400).end();
  } else {
    console.log('Update list', fields);
    resp.json(storage.upsert('list', fields));
  }
});

listApiRouter.delete('/:id', function (req, resp, next) {
  console.log('calling deletion' + req.params.id);
  var listToDelete = storage.getOne('list', parseInt(req.params.id));
  console.log(listToDelete);
    if(listToDelete){
      resp.json(storage.del('list', parseInt(req.params.id)));
    }
    else{
      resp.status(404).end();
    }

})

module.exports = listApiRouter;