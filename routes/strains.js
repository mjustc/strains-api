const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

router.get('/', (req, res, next) => {
  const projection = {
    '_id': 0,
  };

  Models.Strains.find({}, projection)
  .limit(200)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

router.get('/medical/', (req, res, next) => {

  const filter = {
    'effects.medical' : { $all: req.query.effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .limit(10)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

router.get('/negative/', (req, res, next) => {

  const filter = {
    'effects.negative' : { $all: req.query.effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .limit(10)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

router.get('/negative/avoid', (req, res, next) => {

  const filter = {
    'effects.negative' : { $nin: req.query.effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .limit(10)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

router.get('/positive/', (req, res, next) => {

  const filter = {
    'effects.positive' : { $all: req.query.effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .limit(10)
  .exec().then(result => {
    res.status(200).json(result);
  });
});



router.get('/:race', (req, res, next) => {
  const race = req.params.race;
  const filter = {
    'race': race
  };
  const limit = 10;
    Strains.find(filter)
    .limit(limit)
    .exec().then(result => {
      console.log(result);
      res.status(200).json(result);
    });
});

module.exports = router;