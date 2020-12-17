const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSwagger = require('express-swagger-generator')(app);

const surveyRoutes = require('./routes/survey');
const strainRoutes = require('./routes/strains');
const effectsRoutes = require('./routes/effects');
const flavorsRoutes = require('./routes/flavors');

const uri = 'mongodb://127.0.0.1:27017/local'

let options = {
    swaggerDefinition: {
        info: {
            description: 'API to search for CBD strains',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js', './models/*.js'] //Path to the API handle folder
};

expressSwagger(options)
mongoose.connect(uri, function (error) {
    if (error) throw error;
    console.log("Connected to mongo db local");
});

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/survey', surveyRoutes);
app.use('/strains', strainRoutes);
app.use('/effects', effectsRoutes);
app.use('/flavors', flavorsRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Something wrong",
        },
    });
});

module.exports = app;