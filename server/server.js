
global.colors = require('colors');

const express = require("express"), app = express();
const dotENV = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { headers } = require('./middlewares/headers');
const dbConfig = require("./config/dbConfig.json");
const router = require('./middlewares/router');

const url = "mongodb://" + dbConfig.CONNECTION_STRING.HOST + ":" + dbConfig.CONNECTION_STRING.PORT + "/" + dbConfig.DATABASE;

// middlewares
app.use(bodyParser.json());
app.use(headers);
app.use(router);

//mongoose connection
mongoose.connect(url, {useNewUrlParser: true})
		.then( () => {
            console.log("DB Connected Successfully".green);	
            app.listen(process.env.PORT || 4000,() => {
                dotENV.config({ path: "./.env" });    
                console.log('Server listening at 4000'.green);
            });            		            
		})
		.catch( err => {
            console.log('Connection error'.red, err);
        });  