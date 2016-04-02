// todo adapt to SQL and to user

module.exports.findOne = function(isbn, callback){
  Book.findOne({isbn: isbn}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findAll = function(callback){
  Book.find({}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.addNewBook = function(body, callback){
  var book = new Book({
    name:body.name,
    isbn: body.isbn,
    author: body.author,
    pages: body.pages
  });

  //Saving the model instance to the DB
  book.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Successfully added book",
      book:result
    });
  });
}

module.exports.editBook = function(body, isbn, callback){
  Book.findOne({isbn: isbn}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"Book with ISBN: " + isbn+" not found.",
      });
    }

    result.name   = body.name;
    result.isbn   = body.isbn;
    result.author = body.author;
    result.pages  = body.pages;

    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the book",
        book: result
      });
    });

  });
}

module.exports.deleteBook = function(isbn, callback){
  Book.findOneAndRemove({isbn: isbn}, function(err, result){
      callback({
        message: "Successfully deleted the book",
        book: result
      });
  });
}