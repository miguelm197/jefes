app.controller("navCtrl", ["$scope", "loginFact", "$location", '$rootScope', function ($scope, loginFact, $location, $rootScope) {
    $scope.sesion = { }

    $scope.cerrarSesion = function () {
        loginFact.ClearCredentials();
        $location.path("Login");
    }


    // $scope.$watch("globals",function(newValue,oldValue) {
    //     cargarDatosSesion();
    //  })


}]);