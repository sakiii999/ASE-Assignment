/**
 * Created by Saki on 01/02/17.
 */

var app =angular.module("GoogleDirection", [])
    .controller("googlemapoutput", function ($scope) {

        var map;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();

        $scope.initialize = function () {
            var pos = new google.maps.LatLng(0, 0);
            var mapOptions = {
                zoom: 3,
                center: pos
            };

            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            new google.maps.places.Autocomplete(
                (document.getElementById("start")), {
                    types: ["geocode"]
                });

            new google.maps.places.Autocomplete(
                (document.getElementById("end")), {
                    types: ["geocode"]
                });
        };
        $scope.calcRoute = function () {
            var end = document.getElementById("end").value;
            var start = document.getElementById("start").value;

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }

            });
        };

        google.maps.event.addDomListener(window, "load", $scope.initialize);

    });
app.controller("weatherCtrl", ["$scope", "weatherService", function ($scope, weatherService) {
    function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function (data) {
            $scope.place = data;
        });
    }
    fetchWeather(" ");
    $scope.findWeather = function (zip) {
        $scope.place = "";
        loc =document.getElementById("start").value;
        fetchWeather(loc);
    };
}]);
app.factory("weatherService", ["$http", "$q", function ($http, $q) {
    function getWeather(zip) {
        var deferred = $q.defer();
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + zip + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .success(function (data) {
                deferred.resolve(data.query.results.channel);
            })
            .error(function (err) {
                console.log("Error retrieving markets");
                deferred.reject(err);
            });
        return deferred.promise;
    }
    return {
        getWeather: getWeather
    };
}]);
app.controller("weatherCtrl1", ["$scope", "weatherService", function ($scope, weatherService) {
    function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function (data) {
            $scope.place = data;
        });
    }
    fetchWeather(" ");
    $scope.findWeather = function (zip) {
        $scope.place = "";
        loc =document.getElementById("end").value;
        fetchWeather(loc);
    };
}]);
app.factory("weatherService", ["$http", "$q", function ($http, $q) {
    function getWeather(zip) {
        var deferred = $q.defer();
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + zip + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .success(function (data) {
                deferred.resolve(data.query.results.channel);
            })
            .error(function (err) {
                console.log("Error retrieving markets");
                deferred.reject(err);
            });
        return deferred.promise;
    }
    return {
        getWeather: getWeather
    };
}]);