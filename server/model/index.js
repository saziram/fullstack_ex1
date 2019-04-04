const { Users, Topics, Questions, Answers, Comments } = require('./schema'), 
dateFormatter = require('./../helper/dateFormatter'),
{ errorHandling } = require('./errorHandling');

module.exports = {
    //AUTHENTICATION SERVICES
    login: (args) => {
        return Users
            .findOne({username: args.username})       
            .then(
                Users => Users.validatePassword(args.password)
            ).then(
                userData => userData
            )
            .catch(
                err => {
                    if(err) console.log(err);
                    return {errMsg: "User Doesn\'t Exists"};
                }
            );					
    },
    register: (postBody) => {
        let _Users = new Users(postBody);
        return _Users
            .save()
            .then( 
                results => results
            )                
            .catch( 
                err => {
                    return errorHandling(err);
                }                     
            );				
    },   
    //GET REQUEST HANDLERS 
    getTopics: (args) => {
        return Topics
            .find(args)
            .populate('createdBy', 'userID')
            .populate('questions', 'question')
            .then( 
                results => results
            );					
    },	
    getQuestions: (args) => {
        return Questions
            .find(args)
            .populate('createdBy', 'userID')            
            .populate('topic', 'topic')
            .populate('answers', 'answer')
            .then( 
                results => results
            );					
    },	
    getAnswers: (args) => {
        return Answers
            .find(args)
            .populate('createdBy', 'userID')
            .populate('question', 'question')
            .populate('comments', 'comment')
            .then( 
                results => results
            );					
    },	   
    //POST REQUEST HANDLERS
    createNewTopic: (postBody) => {	
        let _Topics = new Topics(postBody);	
        return _Topics
            .save()	
            .then( 
                results => results
            )
            .catch(err => {
                return errorHandling(err);
            });
    },     
    createNewQuestion: (postBody) => {	
        let _Question = new Questions(postBody);
        return _Question
            .save()	
            .then( 
                results => Topics.updateOne({_id:postBody.topic}, { $push: {questions:results._id} }, {upsert:true})
            )
            .then(
                results => results   
            )            
            .catch(err => {
                return errorHandling(err);
            });
    },    
    createNewAnswer: (postBody) => {	
        let _Answers = new Answers(postBody);
        return _Answers
            .save()	
            .then( 
                results => Questions.updateOne({_id:postBody.question}, { $push: {answers:results._id} }, {upsert:true})
            )
            .then(
                results => results   
            )
            .catch(err => {
                return errorHandling(err);
            });
    },    
    createNewComment: (postBody) => {	
        let _Comments = new Comments(postBody);
        return _Comments
            .save()	
            .then( 
                results => Answers.updateOne({_id:postBody.answer}, { $push: {comments:results._id} }, {upsert:true})
            )
            .then(
                results => results   
            )            
            .catch(err => {
                return errorHandling(err);
            });
    },
    //COMMON UPDATE HANDLERS         
    updateHandler: (condition, postBody, reqModel) => {	
        var model;
        switch (reqModel) {
            case 'topic':
              model = Topics;
              break;
            case 'question':
              model = Questions;
              break;
            case 'answer':
              model = Answers;
              break; 
            case 'comment':
              model = Comments;
              break;                              
          }
        return model
            .updateOne(condition, postBody, {upsert:true})
            .then(
                results => results   
            )            
            .catch(err => {
                return errorHandling(err);
            });
    }    
};	