const mongoose = require("mongoose");
const dbConfig = require("./dbConfig.json");

const url = "mongodb://" + dbConfig.CONNECTION_STRING.HOST + ":" + dbConfig.CONNECTION_STRING.PORT + "/" + dbConfig.DATABASE;

//mongoose connection
mongoose.connect(url, {useNewUrlParser: true})
		.then( () => {
            console.log("DB Connected Successfully".green);			            
		})
		.catch( err => {
            console.log('Connection error'.red, err);
        });  