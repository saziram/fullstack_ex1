const mongoose = require('mongoose'), 
AutoIncrement = require('mongoose-sequence')(mongoose),
Schema = mongoose.Schema, 
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 12;

const questions 
= new Schema({
	questionID: {
		type : Number
	},					
	topic: {
		type : String,
		required: true
	},	
	question: {
		type : String,
		required: true
	},
	user: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	}],
	answer: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Answers' 
	}],		
	date: {
		type : Date,
		required: true
	}	
}).plugin(AutoIncrement, {inc_field: 'questionID', disable_hooks: true});

const answers 
= new Schema({
	answerID: {
		type : Number
	},		
	answer: {
		type : String,
		required: true
	},
	comment: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Comments' 
	}],		
	user: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	}],	
	date: {
		type : Date,
		required: true
	}	
}).plugin(AutoIncrement, {inc_field: 'answerID', disable_hooks: true});

const comments 
= new Schema({
	commentID: {
		type : Number
	},					
	comment: {
		type : String,
		required: true
	},
	user: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Users' 
	}],
	date: {
		type : Date,
		required: true
	}	
}).plugin(AutoIncrement, {inc_field: 'commentID', disable_hooks: true});

const users 
= new Schema({
	userID: {
		type : Number, 
		default: 1000
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
}).plugin(AutoIncrement, {inc_field: 'userID', disable_hooks: true});

users.pre('save', function(next) {
	var user = this;
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
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

module.exports = {
	Users: mongoose.model('Users', users),
	Questions : mongoose.model('Questions', questions),
	Answers: mongoose.model('Answers', answers),
	Comments: mongoose.model('Comments', comments)
}