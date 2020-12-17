const mongoose = require('mongoose');

/**
 * @typedef Strain
 * @property {integer} id
 * @property {string} name
 * @property {string} race
 * @property {Array.<Effect>} effects
 * @property {Array.<Flavor>} flavors
 */
const strains = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    race: String,
    effects: [],
    flavors: []
});

/**
 * @typedef Effect
 * @property {ObjectId} _id
 * @property {string} name
 * @property {string} type  - eg: positive, negative or medical
 */
const effects = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String
});

/**
 * @typedef Flavor
 * @property {ObjectId} _id
 * @property {string} name - eg: Earthy, Mango, Pepper, etc...
 */
const flavors = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

Strains = mongoose.model('strains', strains); 
Effects = mongoose.model('effects', effects);
Flavors = mongoose.model('flavors', flavors);

module.exports = {
    Strains: Strains,
    Effects: Effects,
    Flavors: Flavors
};