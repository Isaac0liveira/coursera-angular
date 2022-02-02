(function() {
    'use strict'

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchBag = "";
        $scope.messageAlert = "";
        $scope.checkIfTooMuch = function(){
            var lunches = splitString($scope.lunchBag, ',');
            console.log(lunches)
            if(lunches.length === 1 && lunches[0] === ''){
                $scope.messageAlert = "Empty!";
            }else if(lunches.length <= 3){
                $scope.messageAlert = "Enjoy!";
            }else{
                $scope.messageAlert = "Too much!";
            }
        }

        function splitString(string, separator){
            return string.split(separator);
        }
    }
})();