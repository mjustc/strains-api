const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

router.get('/', (req, res, next) => {
  const projection = {
    '_id': 0,
  };

  Models.Effects.find({}, projection)
  .limit(200)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

router.get('/:type', (req, res, next) => {
  const filter = {
    'type' : req.params.type
  }
  const projection = {
    '_id': 0, 
  };

  Models.Effects.find(filter, projection)
  .exec().then(result => {
    res.status(200).json(result);
  });

});

module.exports = router;