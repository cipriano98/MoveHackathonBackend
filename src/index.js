const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const routes = require("./routes");
require("dotenv/config");

const app = express();

const port = process.env.SERVER_PORT || 3030

mongoose.connect(
    process.env.MONGO_CONECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors({
    // origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'OPTIONS', 'GET', 'DELETE', 'PUT']);
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, , Accept");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(routes);

app.listen(port);

console.log(`Acesse http://localhost:${port}/`);