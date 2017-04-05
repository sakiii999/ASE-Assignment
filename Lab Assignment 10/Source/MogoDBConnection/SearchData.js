
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://root:garuda@ds151450.mlab.com:51450/asedemo';
var findUser = function(db, callback) {
    var cursor =db.collection('users').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('users').find({"fname":"Saketh"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            var hey=doc.fname;
            localStorage.setItem()
            console.log("Last Name:" + doc.lname);
            console.log("city:" + doc.address.city);
        }
    });
}
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
   findUserwithName(db, function() {
       db.close();
    });
});