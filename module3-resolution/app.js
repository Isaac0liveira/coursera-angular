(function () {
    'use strict'

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('NarrowItDownService', NarrowItDownService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective(){
        var ddo = {
            templateUrl: "./directives/found_list.html",
            scope: {
                list: "<",
                method: "&method"
            }
        }

        return ddo;
    }

    NarrowItDownController.$inject = ['NarrowItDownService']
    function NarrowItDownController(NarrowItDownService) {
        var narrow = this;
        narrow.value = "";

        narrow.searchValue = function () {
            narrow.found = NarrowItDownService.searchList(narrow.value);
        }

        narrow.delete = function (index){
            narrow.found.splice(index, 1);
        }
    }

    NarrowItDownService.$inject = ['$http'];
    function NarrowItDownService($http) {
        var service = this;
        var list = [];
        $http({
            method: 'GET',
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function (response) {
            list = response.data.menu_items;
        }).catch(function (error) {
            console.log(error);
        })

        service.searchList = function (value){
            return list.filter(function (item){
                return item.description.includes(value);
            });
        };
    }
})()