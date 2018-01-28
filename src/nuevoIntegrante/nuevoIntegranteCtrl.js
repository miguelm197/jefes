app.controller("nuevoIntegranteCtrl", ["$scope", "$rootScope", "nuevoIntegranteFact", function ($scope, $rootScope, nuevoIntegranteFact) {

    $scope.agregarIntegrante = function () {
        var integrante = {};
        var sexo = $scope.opcion;
        var relacion = $scope.opcion2;

        integrante = $scope.busqueda;
        integrante.sexo = sexo;
        integrante.relacion = relacion;

        nuevoIntegranteFact.agregarIntegrante(integrante).then(function(){
            alert("Se agregó correctamente")
        })


    }


}]);