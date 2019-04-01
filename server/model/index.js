const { Users, Books, Sales } = require('./schema'), 
dateFormatter = require('./../helper/dateFormatter'),
{ errorHandling } = require('./errorHandling');

module.exports = {
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
        var _Users = new Users(postBody);
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
    getSales: () => {
        return Sales
            .find()
            .populate('books')
            .then( results => {
                return results.map( data => {
                    return { ...data._doc, _id: data.id, date: dateFormatter(data._doc.date) };
                });
            });					
    },	
    createBook: (args) => {		
        return Books
            .create(args.postBody)
            .then( results => {
                return [{ ...results._doc, _id: results.id, date: dateFormatter(data._doc.date) }];
            });
    },
    createSale: (args) => {		
        return Books
            .findById(args.postBody.books)	
            .populate('books')
            .then( results => {
                if(!results){
                    throw new Error("Book not available in stock!!!");
                }
                return Sales.create(args.postBody);
            })
            .then( results => {
                return [{ ...results._doc, _id: results.id, date: dateFormatter(data._doc.date) }];
            })
            .catch(err => {
                throw err;
            });
    }		
};	