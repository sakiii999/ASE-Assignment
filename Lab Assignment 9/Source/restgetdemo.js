
var express = require('express');
var app = express();
var request = require('request');

//var request1 = require('request');

app.get('/getPlace', function (req, res) {
    var result={
        'items': []
    };

    request('https://api.walmartlabs.com/v1/search?&format=json&query="Iphone6S"&apiKey=4asecwtth79ttz6pgvd77es2', function (error, response, body){
  //  request1('https://api.foursquare.com/v2/venues/search?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215&limit=5&near=Kansas&query=walmart', function (error1, response1, body1) {
        //Check for error
        if(error){
            return console.log('Error:', error);
    //        return console.log('Error:', error1);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        // if(response1.statusCode !== 200){
        //     return console.log('Invalid Status Code Returned:', response1.statusCode);
        // }
        //All is good. Print the body
        body = JSON.parse(body);
     //   body1 = JSON.parse(body1);
       // var ven1 = body1.response.venues;
        var ven = body.items;
        for(var i=0;i<ven.length;i++)
        {
            result.items.push({'name': ven[i].name,
                                'price':ven[i].salePrice});
        }
        // for(var i=0;i<ven1.length;i++)
        // {
        //     result.items.push({'Walmartname': ven1[i].name,
        //         'address':ven1[i].location.formattedAddress.toString()});

    });

    //request('https://api.walmartlabs.com/v1/search?&format=json&query="Iphone6S"&apiKey=4asecwtth79ttz6pgvd77es2', function (error, response, body){
    request('https://api.foursquare.com/v2/venues/search?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215&limit=5&near=Kansas&query=walmart', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
            //        return console.log('Error:', error1);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        // if(response1.statusCode !== 200){
        //     return console.log('Invalid Status Code Returned:', response1.statusCode);
        // }
        //All is good. Print the body
        body = JSON.parse(body);
        //   body1 = JSON.parse(body1);
         var ven = body.response.venues;
        //var ven = body.items;
        for(var i=0;i<ven.length;i++)
        {
            result.items.push({'name': ven[i].name});
        }
        // for(var i=0;i<ven1.length;i++)
        // {
        //     result.items.push({'Walmartname': ven1[i].name,
        //         'address':ven1[i].location.formattedAddress.toString()});
        // }
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();

        console.log(result);
    });
    console.log(result);
//second api


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})