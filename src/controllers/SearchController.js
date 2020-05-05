const Personal = require("../models/Personal");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
    async index(request, response) {
        const { latitude, longitude, skills } = request.query;

        const skillsArray = parseStringAsArray(skills);

        const personals = await Personal.find({
            skills: {
                $in: skillsArray, //.ignoreCase(), //@audit add ignore case
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10 * 1000 /* Multiplica por mil por ser media em metros*/,
                },
            },
        });

        return response.json({ personals });
    }
};