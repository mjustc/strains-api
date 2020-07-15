const mongoose = require('mongoose');

const strains = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    race: String,
    effects: [],
    flavors: []
});

const effects = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String
});

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
    Flavors: Flavors,
};