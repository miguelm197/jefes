app.controller("informacionEspecificaEventoCtrl", ["$scope", "$rootScope", "informacionEspecificaEventoFact", function ($scope, $rootScope, informacionEspecificaEventoFact) {
    try {
        var ciPers = $rootScope.ciAfectadoSeleccionado;
    } catch (error) {
        var ciPers = false;
    }
    $scope.evacuado = false;

    $scope.cargarInfoPers = function () {
        informacionEspecificaEventoFact.consultaPersPorCi(ciPers).then(function (res) {
            $scope.persona = res.data[0];
        })
    }
    if (ciPers != undefined)
        $scope.cargarInfoPers();

    $scope.agregarInfoEspe = function () {
        var evento = {
            desplzado: $scope.desplazado,
            evacuados: $scope.evacuado,
            ubicacion: $scope.opcion,
            calle: $scope.evento.calle,
            numero: $scope.evento.numero,
            fechaMod: new Date()
        }

        $scope.persona.evento = evento;
        var idPers = $scope.persona.id;
        informacionEspecificaEventoFact.actualizarPersona(idPers, $scope.persona).then(function () {
            alert("se agregó el evento correctamente")
        }, function error() {
            alert("Ah ocurrido un error")
        })
        console.log($scope.persona)
    }

}]);