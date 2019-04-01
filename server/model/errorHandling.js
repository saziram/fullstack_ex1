module.exports = { 
    errorHandling : err => {
        if (err) {
            switch (err.name) {
              case 'ValidationError':  
                var fieldArray = [];            
                for (field in err.errors) {
                    fieldArray.push(err.errors[field].message)
                }
                return {ValidationError: fieldArray};
              break;
              case 'MongoError':              
                return {errCode: err.code, errMsg: err.errmsg};
              break;         
              default:              
                return {Error: err};
              break;                        
            }
          }
    }
}
