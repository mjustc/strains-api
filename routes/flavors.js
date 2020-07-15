const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

router.get('/', (req, res, next) => {
  const projection = {
    '_id': 0,
  };

  Models.Flavors.find({}, projection)
  .exec().then(result => {
    res.status(200).json(result);
  });
});

module.exports = router;