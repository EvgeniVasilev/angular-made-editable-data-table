app.controller('mainCtrl', mainCtrl);

// creates controller
function mainCtrl($scope, $http, $timeout) {
    $scope.data = [];
    $scope.ages = [];
    $scope.changedRecord = "";
    $scope.averageAges = "";
    
    $http.get("./data/persons.json").then(function (response) {
        $scope.data = response.data;
        $scope.getAverageAges();
    });

    $scope.editRecord = function (item) {
        var name = item.name;
        var family = item.family;
        var born = item.born;
        var phone = item.phone;
        if (item) {
            $scope.changedRecord = "The record  will be changed to:" + " Name: " + name + " " + family + " Year of birth:  " + born + " Telephone Number: " + phone;
            this.item.name = name;
            this.item.family = family;
            this.item.phone = phone;
            this.item.born = parseInt(born);
        }
        $timeout(function() {
            $scope.changedRecord = "";
        }, 5000);
        $scope.getAverageAges();
        
    };

    $scope.deleteRecord = function (index) {
        $scope.data.splice(index, 1);
        $scope.getAverageAges();

    };

    $scope.addPerson = function () {
        if ($scope.fName && $scope.lName && $scope.pBorn && $scope.phone) {
            $scope.data.push({
                "name": $scope.fName,
                "family": $scope.lName,
                "phone": $scope.phone,
                "born": parseInt($scope.pBorn)
            });
            $scope.fName = "";
            $scope.lName = "";
            $scope.pAges = "";
            $scope.phone = "";

            $scope.getAverageAges();

        } else {
            alert("Please fill in all the fields");
        }
    };

    $scope.getAverageAges = function () {
        var dataLength = $scope.data.length;
        var date = new Date();
        var currentYear = date.getFullYear();
        var ages = [];

        for (var i = 0; i < dataLength; i++) {
            ages.push(currentYear - $scope.data[i].born)
        }

        if (ages.length > 0) {
            $scope.averageAges = "Average ages of customres: " + Math.round(_.reduce(ages, function (memo, num) {
                return memo + num;
            }, 0) / ages.length);
        } else {
            $scope.averageAges = "Average ages of customres: " + 0;
        }
    }
};
