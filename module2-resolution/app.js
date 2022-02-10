(function (){
    'use strict'

    angular.module("ShoppingCheckOffModule", [])
        .controller("ShoppingToBuyController", ShoppingToBuyController)
        .controller("ShoppingBoughtController", ShoppingBoughtController)
        .service("ShoppingCheckOffService", ShoppingCheckOffService);

    ShoppingToBuyController.$inject = ["ShoppingCheckOffService"];
    function ShoppingToBuyController(ShoppingCheckOffService){
        var shoppingToBuy = this;
        var items = [
            { name: "Cookies", quantity: 10 },
            { name: "Ice Cream", quantity: 1},
            { name: "Milk", quantity: 3 },
            { name: "Ypioca", quantity: 7 },
            { name: "Heineken", quantity: 6 }
        ];
        shoppingToBuy.list = ShoppingCheckOffService.setItems(items);
        shoppingToBuy.buy = function (index){
            ShoppingCheckOffService.buyItems(index);
        }
    }

    ShoppingBoughtController.$inject = ["ShoppingCheckOffService"];
    function ShoppingBoughtController(ShoppingCheckOffService){
        var shoppingBought = this;
        shoppingBought.list = ShoppingCheckOffService.getBoughtItems();
    }

    function ShoppingCheckOffService(){
        var shoppingCheckOff = this;

        var toBuyList = [];
        var boughtList = [];

        shoppingCheckOff.setItems = function (list){
            if(list.length !== undefined && list.length >= 5) {
                toBuyList.push(...list);
                return toBuyList;
            }else{
                console.log("Minimum of items not achieved!");
            }
        };

        shoppingCheckOff.buyItems = function (index){
            boughtList.push(toBuyList[index]);
            toBuyList.splice(index, 1);
        };

        shoppingCheckOff.getBoughtItems = function (){
            return boughtList;
        }
    }

})();