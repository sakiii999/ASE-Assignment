'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.itemList = new Array();
        $scope.mostRecentReview;
        $scope.List=new Array();
        $scope.getVenues = function () {
            var itemEntered = document.getElementById("txt_itemName").value;
            console.log(itemEntered);
            if (itemEntered != null && itemEntered != "" ) {
                document.getElementById('div_ReviewList').style.display = 'none';
                console.log(itemEntered);
                //This is the API that gives the list of venues based on the place.
                var handler = $http.get("https://api.walmartlabs.com/v1/search?&format=json&query="+itemEntered+"&apiKey=4asecwtth79ttz6pgvd77es2");
                handler.success(function (data) {

                    if (data != null) {
                        for (var i = 0; i < data.items.length; i++) {
                            $scope.itemList[i] = {
                                "name": data.items[i].name,
                               "id": data.items[i].itemId,
                               // "price": data.response.items[i].salePrice

                            };
                           // console.log("work1");
                        }
                        //console.log("w2");
                    }

                })
                //handler.header("Access-Control-Allow-Origin", "*");
                handler.error(function (data) {
                    console.log(error);
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
        $scope.getReviews = function (itemSelected) {
            if (itemSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.walmartlabs.com/v1/search?&format=json&query="+itemSelected.id+"&apiKey=4asecwtth79ttz6pgvd77es2");
                handler.success(function (result) {
                    if (result != null) {
                        // $scope.List = {
                        //     "name": result.items[0].name,
                        //
                        //     "id": result.items[0].itemId,
                        //
                        //     "salePrice":result.items[0].salePrice
                        //     // "price": data.response.items[i].salePrice
                        //
                        // };
                       // console.log(name);

                        $scope.mostRecentReview =result.items[0];

                        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                        var callback = $http.get("https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=h15GWvx13dmr&text="+ $scope.mostRecentReview.longDescription);
                        callback.success(function (data) {
                            if(data!=null)
                            {
                                $scope.ReviewWithSentiment = {"itemSelected":$scope.mostRecentReview.name,
                                                            "PriceOnSale":$scope.mostRecentReview.salePrice,
                                                            "productId":$scope.mostRecentReview.itemId,
                                                            "reviewText" : $scope.mostRecentReview.longDescription,
                                                            "sentimentPostiveScore":data.positive,
                                                             //"score":data.docSentiment.score
                                     };
                                document.getElementById('div_ReviewList').style.display = 'block';


                            }
                        })
                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

    });
