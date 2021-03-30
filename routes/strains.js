const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

/**
 * @route GET /strains
 * @summary Get all CBD strains
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res, next) => {
  const projection = {
    '_id': 0,
  };

  Models.Strains.find({}, projection)
    .exec((err, result) => {
      if (err) throw err
      res.status(200).json({
        title: result.length + " Strains",
        result: result
      });
    });
});


router.get('/filtered', (req, res, next) => {
  const projection = {
    '_id': 0,
  };

  Models.Strains.find({}, projection)
    .limit(500)
    .exec((err, result) => {
      if (err) throw err
      res.status(200).json(result);
    });
});

/**
 * @route GET /strains/medical
 * @summary Get strains that includes selected medical effects
 * @param {Array.<Effect>} effects.query.required - medical effects - eg: Pain
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/medical/', (req, res, next) => {

  effects = sanitize(req.query.effects)

  const filter = {
    'effects.medical' : { $in: effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
        title: result.length + " Strains with medical effects: " + effects,
        result: result
      });
  });

});

/**
 * @route GET /strains/medical/all
 * @summary Get strains that includes all selected medical effects
 * @param {Array.<Effect>} effects.query.required - medical effects - eg: Pain
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/medical/all', (req, res, next) => {
  
  effects = sanitize(req.query.effects)

  const filter = {
    'effects.medical' : { $all: effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
        title: result.length + " Strains with medical effects: " + effects,
        result: result
      });
  });

});

/**
 * @route GET /strains/negative/avoid
 * @summary Get strains without selected negative effects
 * @param {Array.<Effect>} effects.query.required - negative effects - eg: Dry Mouth
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/negative/avoid', (req, res, next) => {

  effects = sanitize(req.query.effects)

  const filter = {
    'effects.negative' : { $nin: effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
        title: result.length + " Strains without negative effects: " + effects,
        result: result
      });
  });
});

/**
 * @route GET /strains/positive
 * @summary Get strains with selected positive effects
 * @param {Array.<Effect>} effects.query.required - positive effects - eg: Happy
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/positive', (req, res, next) => {

  effects = sanitize(req.query.effects)

  const filter = {
    'effects.positive' : { $in: effects }
  }
  const projection = {
    '_id': 0,
  };

  Models.Strains.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
        title: result.length + " Strains with positive effects: " + effects,
        result: result
      });
  });

});

/**
 * @route GET /strains/race/{race}
 * @summary Get strains with selected race
 * @param {string} race.path.required - eg: Sativa, Indica, Hybrid
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/race/:race', (req, res, next) => {
  const race = req.params.race;
  const filter = {
    'race': { $regex: race, $options: 'i'}
  };
  const projection = {
    '_id': 0,
  };

  Strains.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
        title: result.length + " Strains with race: " + race,
        result: result
      });
  });
});

/**
 * @route GET /strains/name/{name}
 * @summary Get strain selected by name
 * @param {string} name.path.required - eg: Haze
 * @group Strains - Operations with strains
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.get('/name/:name', (req, res, next) => {
  const name = req.params.name;
  const filter = {
    'name': { $eq: name }
  };

  Strains.find(filter)
  .exec((err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.status(400).json({
        result: "Strain not found"
      });
    }
    res.status(200).json({
        result: result
      });
  });
});

function sanitize(effects) {
  sanitized = [];
  effects.split(",").forEach(element => {
    sanitized.push(element.trim());
  });
  return sanitized;
}

module.exports = router;