const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

/**
 * @route GET /flavors
 * @summary Get all flavors
 * @group Flavors - Operations with flavors
 * @returns {object} 200 - EFlavorsffects
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res, next) => {

  Models.Flavors.find()
  .exec((err, result) => {
    if (err) throw err
    res.status(200).json({
      title: result.length + " Flavors",
      result: result
    });
  });
});

/**
 * @route GET /flavors/common
 * @summary Get flavors sorted by more common
 * @group Flavors - Operations with flavors
 * @returns {object} 200 - Flavors
 * @returns {Error}  default - Unexpected error
 */
router.get('/common/', (req, res, next) => {

  Models.Strains.aggregate([{
    $unwind: {
      path: "$flavors"
    }
    }, {
    $group: {
      _id: "$flavors",
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