app.controller("nuevoIntegranteCtrl", ["$scope", "$rootScope", "nuevoIntegranteFact", function ($scope, $rootScope, nuevoIntegranteFact) {

    $scope.agregarIntegrante = function () {
        var integrante = {};
        var sexo = $scope.opcion;
        var relacion = $scope.opcion2;

        integrante = $scope.busqueda;
        integrante.sexo = sexo;

        if (relacion == "mismo") {
            integrante.relacion = {
                "jefe": $scope.busqueda.ci,
                "desc": relacion
            }
        }


        nuevoIntegranteFact.agregarIntegrante(integrante).then(function () {
            alert("Se agregó correctamente")
        })


    }


}]);