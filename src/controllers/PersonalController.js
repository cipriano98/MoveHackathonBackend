const axios = require('axios');
const Personal = require('../models/Personal');
const parceStrigAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {

        const personals = await Personal.find();
        console.log("Buscou personal →", personals);
        return response.json(personals);

    },

    async store(request, response) {

        const {
            name,
            bio,
            email,
            cref,
            page_web,
            birth_date,
            whatsapp,
            avatar,
            skills,
            latitude,
            longitude
        } = request.body;

        let personal = await Personal.findOne({ email });

        if (!personal) {

            const skillsArray = parceStrigAsArray(skills);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            personal = await Personal.create({
                name,
                bio,
                email,
                cref,
                page_web,
                birth_date,
                whatsapp,
                avatar,
                skills: skillsArray,
                location,
            })

        }

        return response.json(personal);

    }

};