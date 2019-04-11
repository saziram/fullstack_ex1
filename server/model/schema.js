const mongoose = require('mongoose'), 
Schema = mongoose.Schema, 
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 12;

const topics 
= new Schema({
	topicID: {
		type : Number
	},					
	topic: {
		type : String,
		required: true
	},	
	questions: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Questions' 
	}],			
	createdBy: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	}],	
	date: {
		type : Date
	}	
}).pre('save', async function(next) {
	let model = await sequenceGenerator('topicID');
	let userData = await getUserID(process.env.USER_ID);
	this.topicID = model.seq;
	this.createdBy = userData._id;
	this.date = new Date();
	next();
});

const questions 
= new Schema({
	questionID: {
		type : Number
	},
	topic: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Topics' 
	}],									
	question: {
		type : String,
		required: true
	},
	answers: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Answers' 
	}],		
	createdBy: [{ 
		type: String, 
		ref: 'Users' 
	}],
	date: {
		type : Date
	}	
}).pre('save', async function(next) {
	let model = await sequenceGenerator('questionID');
	let userData = await getUserID(process.env.USER_ID);
	this.questionID = model.seq;		
	this.createdBy = userData._id;
	this.date = new Date();
	next();
});

const answers 
= new Schema({
	answerID: {
		type : Number
	},
	question: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Questions' 
	}],					
	answer: {
		type : String,
		required: true
	},
	comments: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Comments' 
	}],		
	createdBy: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	}],	
	date: {
		type : Date
	}	
}).pre('save', async function(next) {
	let model = await sequenceGenerator('answerID');
	this.answerID = model.seq;		
	this.date = new Date();
	next();
});

const comments 
= new Schema({
	commentID: {
		type : Number
	},					
	answer: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Answers' 
	}],			
	comment: {
		type : String,
		required: true
	},
	createdBy: { 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	},
	date: {
		type : Date
	}	
}).pre('save', async function(next) {
	let model = await sequenceGenerator('commentID');
	this.commentID = model.seq;	
	this.date = new Date();
	next();
});

const users 
= new Schema({
	userID: {
		type : Number,
		index: { unique: true }
	},		
	username: {
		type : String,
		required: true,
		index: { unique: true }
	},
	password: {
		type : String,
		required: true
	},
	date: {
		type : Date
	}	
}).pre('save', async function(next) {
	let model = await sequenceGenerator('userID');
	this.userID = model.seq;		
	this.date = new Date();
	next();
});

const Sequence = 
mongoose.model('Sequence', new Schema({
	id: {
		type : String, 
		required: true,
		index: { unique: true }
	},		
	reference_value: {
		type : String
	},
	seq: {
		type : Number,
		required: true,
		default: 1000,
		index: { unique: true }
	}
}));

function sequenceGenerator(field){	
	return Sequence.findOneAndUpdate({
		id: field
		}, {
			$inc: {
				seq: 1
			}
		},
		function(err, response) {
			if (err) throw err;
			return response;
	});							
}



function getUserID(userID){	
	return model.Users.findOne({userID: userID}, 
		function(err,response) { 
			return response;
		}
	)							
}

users.pre('save', function(next) {
	var user = this;
    if (!user.isModified('password')) return next();
    // generate a salt
	bcrypt.hash(user.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), async (err, hash) => {
		if (err) return next(err);
		user.password = hash;
		next();	
	});
});

users.methods.validatePassword = function(candidatePassword) {
	return new Promise( (resolve, reject) => {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {		
			if(isMatch) resolve(this);
			reject(err);
		});
	});
}

const model = {
	Users: mongoose.model('Users', users),
	Topics : mongoose.model('Topics', topics),
	Questions : mongoose.model('Questions', questions),
	Answers: mongoose.model('Answers', answers),
	Comments: mongoose.model('Comments', comments)
}

//export model
module.exports = model