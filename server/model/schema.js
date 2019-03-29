const mongoose = require('mongoose'), Schema = mongoose.Schema;

const books = mongoose.model('Books', new Schema({
	title: {
		type : String,
		required: true
	},
	description: {
		type : String,
		required: true
	},
	author: {
		type : String,
		required: true
	},
	date: {
		type : Date,
		required: true
	}	
}));

const sales = mongoose.model('Sales', new Schema({
	name: {
		type : String,
		required: true
	},
	books: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Books' 
	}],
	price: {
		type : Number,
		required: true
	},
	quantity: {
		type : Number,
		required: true
	},	
	date: {
		type : Date,
		required: true
	}	
}));

module.exports = {
	Books : books,
	Sales: sales
}


