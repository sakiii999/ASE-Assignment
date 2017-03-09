angular.module('app.controllers', [])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
//
// .controller('loginCtrl', function ($scope, $http, $location, $cookieStore) {
//   $scope.invalid = false;
//   console.log($cookieStore);
//   $scope.username = $cookieStore.get('login-input6');
//   $scope.password = $cookieStore.get('login-input7');
//
//   $scope.login=function() {
//     $http.post('/login', {
//       username: $scope.username,
//       password: $scope.password
//     }).success(function(data) {
//       $cookieStore.put('username', $scope.username);
//       $location.path('/');
//     })
//       .error(function() {
//         $scope.password='';
//         $scope.invalid=true;
//       });
//   };
// })

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])



.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

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
        //
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

            //console.log(result.items[0]);

            //This is the Alchemy API for getting the sentiment of the most recent review for a place.
            $scope.mostRecentReview.longDescription = undefined;
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

