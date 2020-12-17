const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

/**
 * @route GET /effects
 * @summary Get all effects
 * @group Effects - Operations with effects
 * @returns {object} 200 - Effects
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res, next) => {

  Models.Effects.find()
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
      title: result.length + " Effects",
      result: result
    });
  });
});

/**
 * @route GET /effects/{type}
 * @summary Get all effects
 * @param {string} type.path.required - eg: Positive, Negative, Medical
 * @group Effects - Operations with effects
 * @returns {object} 200 - Effects
 * @returns {Error}  default - Unexpected error
 */
router.get('/:type', (req, res, next) => {
  const filter = {
    'type': { $regex: req.params.type, $options: 'i'}
  };
  const projection = {
    '_id': 0, 
  };

  Models.Effects.find(filter, projection)
  .exec((err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.status(400).json({
        result: "Effect not found"
      });
    }
    res.status(200).json({
      title: result.length + " Effects",
      result: result
    });
  });

});

/**
 * @route GET /effects/common/medical
 * @summary Get effects sorted by more common
 * @group Effects - Operations with effects
 * @returns {object} 200 - Effects
 * @returns {Error}  default - Unexpected error
 */
router.get('/common/medical/', (req, res, next) => {

  Models.Strains.aggregate([{
    $unwind: {
      path: "$effects.medical"
    }
    }, {
    $group: {
      _id: "$effects.medical",
      count: {
        "$sum": 1
      }
    }
    }, {
    $sort: {
      count: -1
    }
    }, {
    $project: {
      count: 1,
      _id: 0,
      name: "$_id"
    }
  }]).exec().then(result => {
    res.status(200).json(result);
  });
});

/**
 * @route GET /effects/common/positive
 * @summary Get effects sorted by more common
 * @group Effects - Operations with effects
 * @returns {object} 200 - Effects
 * @returns {Error}  default - Unexpected error
 */
router.get('/common/positive/', (req, res, next) => {

  Models.Strains.aggregate([{
    $unwind: {
      path: "$effects.positive"
    }
    }, {
    $group: {
      _id: "$effects.positive",
      count: {
        "$sum": 1
      }
    }
    }, {
    $sort: {
      count: -1
    }
    }, {
    $project: {
      count: 1,
      _id: 0,
      name: "$_id"
    }
  }]).exec().then(result => {
    res.status(200).json(result);
  });
});

/**
 * @route GET /effects/common/negative
 * @summary Get effects sorted by more common
 * @group Effects - Operations with effects
 * @returns {object} 200 - Effects
 * @returns {Error}  default - Unexpected error
 */
router.get('/common/negative/', (req, res, next) => {

  Models.Strains.aggregate([{
    $unwind: {
      path: "$effects.negative"
    }
    }, {
    $group: {
      _id: "$effects.negative",
      count: {
        "$sum": 1
      }
    }
    }, {
    $sort: {
      count: -1
    }
    }, {
    $project: {
      count: 1,
      _id: 0,
      name: "$_id"
    }
  }]).exec().then(result => {
    res.status(200).json(result);
  });
});
 
module.exports = router;