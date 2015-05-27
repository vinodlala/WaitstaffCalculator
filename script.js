angular.module('myApp', ['ngMessages', 'ngAnimate', 'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './home.html',
                controller: 'MyCtrl'
            })
            .when('/new-meal', {
                templateUrl: './new-meal.html',
                controller: 'MyCtrl'
            })
            .when('/my-earnings', {
                templateUrl: './my-earnings.html',
                controller: 'MyCtrl'
            })
            .when('/error', {
                templateUrl: './error.html'
            })
            .otherwise('/error', {
                templateUrl: './error.html'
            });
    })


// 2.1.5
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 1000);
        });
    })




    //.controller("MyCtrl", function ($rootScope) {
    .controller("MyCtrl", ['$rootScope', '$scope', function ($rootScope, $scope) {

        $scope.baseMealPrice = "";
        $scope.taxRatePercent = "";
        $scope.tipPercent = "";

        $scope.baseMealPricePlusTax = 0;
        $scope.baseMealTip = 0;
        $scope.baseMealTotal = 0;

        if (!$rootScope.earningsWasInitialized) {

            $rootScope.tipTotal = 0;
            $rootScope.mealCount = 0;
            $rootScope.averageTipPerMeal = 0;

            $rootScope.tipPercentTotal = 0;
            $rootScope.averageTipPercentagePerMeal = 0;

            $rootScope.earningsWasInitialized = true;;
        }
        $scope.cancel = function () {
            $scope.baseMealPrice = "";
            $scope.taxRatePercent = "";
            $scope.tipPercent = "";
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        };

        $scope.reset = function () {

            $scope.baseMealPrice = "";
            $scope.taxRatePercent = "";
            $scope.tipPercent = "";

            $scope.baseMealPricePlusTax = 0;
            $scope.baseMealTip = 0;
            $scope.baseMealTotal = 0;

            $rootScope.tipTotal = 0;
            $rootScope.mealCount = 0;
            $rootScope.averageTipPerMeal = 0;
            //
            $rootScope.tipPercentTotal = 0;
            $rootScope.averageTipPercentagePerMeal = 0;

            //$scope.myForm.$setPristine();
            //$scope.myForm.$setUntouched();

        };

        $scope.submit = function () {

            $scope.baseMealPricePlusTax = $scope.baseMealPrice * (1 + $scope.taxRatePercent / 100);
            $scope.baseMealTip = $scope.baseMealPricePlusTax * ($scope.tipPercent / 100);
            $scope.baseMealTotal = $scope.baseMealPricePlusTax + $scope.baseMealTip;

            $rootScope.tipTotal = $rootScope.tipTotal + $scope.baseMealTip;
            $rootScope.mealCount += 1;
            $rootScope.averageTipPerMeal = $rootScope.tipTotal / $rootScope.mealCount;

            $rootScope.tipPercentTotal = parseFloat($rootScope.tipPercentTotal) + parseFloat($scope.tipPercent);
            $rootScope.averageTipPercentagePerMeal = $rootScope.tipPercentTotal / $rootScope.mealCount;

            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();

            $scope.baseMealPrice = "";
            $scope.taxRatePercent = "";
            $scope.tipPercent = "";

            //$scope.focusElement = "baseMealPrice";

        };

        //$scope.reset();
    }]);