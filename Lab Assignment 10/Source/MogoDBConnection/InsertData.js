
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://root:garuda@ds151450.mlab.com:51450/asedemo';
var insertDocument = function(db, callback) {
    db.collection('users').insertOne( {
        "fname" : "Saketh",
        "lname" : "Garuda",
        "address":{
            "city":"Kansas City",
            "state":"MO"
        },
        "education" : {
            "university":"UMKC",
            "degree":"Master of Science",
            "major":"Computer Science"
        },
        "mail":"sg7kf@mail.umkc.edu"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});