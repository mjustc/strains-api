const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

//Discover your favourite Strain
// 1. Do you prefer? Sativa, Indica, Hybrid
// 2. How do you like to feel? Effects postive
// 3. Do you need weed for medical purposes? effects medical
// 4. What do you want to avoid when smoking? effects negative
// 5. Which flavors do you like?

router.post('/', (req, res, next) => {

    const race = req.body.race;
    const effects_positive = req.body.positive;
    const effects_medical = req.body.medical;
    const effects_negative = req.body.negative;
    const flavor = req.body.flavor;

    Models.Strains.find(
        {
            $and: [
                race ? { 'race' : { $eq: race } } : {},
                effects_positive ? { 'effects.positive' : { $all: effects_positive } } : {},
                effects_medical ? { 'effects.medical' : { $all: effects_medical } } : {},
                effects_negative ? { 'effects.negative' : { $nin: effects_negative } } : {},
                flavor ? {'flavors' : { $all: flavor} } : {}
             ]
        }
    )
    .limit(10)
    .exec((err, result) => {
        if (err) throw err
        res.status(200).json({
            message: "Your favourtie strains",
            favorites: result
          });
    });
});

module.exports = router;