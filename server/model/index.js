const { Books, Sales } = require('./schema');

module.exports = {
    getBooks: (args) => {
        return Books
                .find(args.requestBody)
                .then( results => {
                    return results.map( data => {
                        return { ...data._doc, _id: data.id, date: dateFormatter(data._doc.date) };
                    });
                });					
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