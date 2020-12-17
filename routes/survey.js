const express = require('express');
const router = express.Router();

const Models = require("../models/strain");

//Discover your favourite Strain
// 1. Do you prefer? Sativa, Indica, Hybrid
// 2. How do you like to feel? Effects postive
// 3. Do you need cbd for medical purposes? effects medical
// 4. What effect do you want to avoid? effects negative
// 5. Which flavors do you like?

/**
 * @typedef SurveyDto
 * @property {string} race
 * @property {Array.<String>} positive
 * @property {Array.<String>} medical
 * @property {Array.<String>} negative
 * @property {Array.<String>} flavors
 */

/**
 * @route POST /survey
 * @summary Discover your favourite CBD strains
 * @param {SurveyDto.model} survey.body.required
 * @group Survey
 * @consumes application/json application/xml
 * @returns {object} 200 - Strains
 * @returns {Error}  default - Unexpected error
 */
router.post('/', (req, res, next) => {

    const race = req.body.race;
    const effects_positive = req.body.positive;
    const effects_medical = req.body.medical;
    const effects_negative = req.body.negative;
    const flavor = req.body.flavors;

    Models.Strains.find(
        {
            $and: [
                race ? { 'race' : { $regex: race, $options: 'i' } } : {},
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
        if (result.length === 0) {
            return res.status(400).json({
                message: "No strains match"
            })
        }
        res.status(200).json({
            message: result.length +  " favourite strains",
            favorites: result
          });
    });
});

module.exports = router;