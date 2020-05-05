const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const PersonalSchema = new mongoose.Schema({
    name: String,
    // surname: String,
    bio: String,
    // cep: Number,
    email: String,
    cref: String,
    page_web: String,
    birth_date: String,
    whatsapp: String,
    avatar: String,
    skills: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Personal', PersonalSchema);