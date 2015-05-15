angular.module('myApp', ['ngMessages'])
    .controller("MyCtrl", function ($scope) {

        $scope.baseMealPrice = "";
        $scope.taxRatePercent = "";
        $scope.tipPercent = "";

        $scope.baseMealPricePlusTax = 0;
        $scope.baseMealTip = 0;
        $scope.baseMealTotal = 0;

        $scope.tipTotal = 0;
        $scope.mealCount = 0;
        $scope.averageTipPerMeal = 0;

        $scope.tipPercentTotal = 0;
        $scope.averageTipPercentagePerMeal = 0;

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

            $scope.tipTotal = 0;
            $scope.mealCount = 0;
            $scope.averageTipPerMeal = 0;
            //
            $scope.tipPercentTotal = 0;
            $scope.averageTipPercentagePerMeal = 0;

            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();

        };

        $scope.submit = function () {

            $scope.baseMealPricePlusTax = $scope.baseMealPrice * (1 + $scope.taxRatePercent / 100);
            $scope.baseMealTip = $scope.baseMealPricePlusTax * ($scope.tipPercent / 100);
            $scope.baseMealTotal = $scope.baseMealPricePlusTax + $scope.baseMealTip;

            $scope.tipTotal = $scope.tipTotal + $scope.baseMealTip;
            $scope.mealCount += 1;
            $scope.averageTipPerMeal = $scope.tipTotal / $scope.mealCount;

            $scope.tipPercentTotal = parseFloat($scope.tipPercentTotal) + parseFloat($scope.tipPercent);
            $scope.averageTipPercentagePerMeal = $scope.tipPercentTotal / $scope.mealCount;

            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();

            $scope.baseMealPrice = "";
            $scope.taxRatePercent = "";
            $scope.tipPercent = "";

            //$scope.focusElement = "baseMealPrice";

        };

        //$scope.reset();
    });