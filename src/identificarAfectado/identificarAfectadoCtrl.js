app.controller("identificarAfectadoCtrl", ["$scope", "$rootScope", "$location", "identificarAfectadoFact", function ($scope, $rootScope, $location, identificarAfectadoFact) {
    $scope.jefes = [];
    var idAfectadoSeleccionado = "";


    $scope.cargarjefes = function () {

        identificarAfectadoFact.consultaJefes().then(function (data) {
            var personas = data.data;
            var jefes = [];

            //PROVISORIO (obtiene todas las personas y filtra solo a los jefes)
            //------------------------------------------------------
            for (let i = 0; i < personas.length; i++) {
                const pers = personas[i];

                var ciJefe = pers.relacion.jefe;
                var ciPers = pers.ci;

                pers.seleccionado = false;

                if (ciJefe == ciPers) {
                    jefes.push(pers);
                }
            }
            $scope["jefes"] = jefes;
            //------------------------------------------------------

        }, function error(err) {
            alert("Ah ocurrido un error");
        });
    }

    $scope.cargarjefes();

    $scope.seleccion = function (item) {

        for (let i = 0; i < $scope.jefes.length; i++) {
            const element = $scope.jefes[i];
            element.seleccionado = false;
        }
        ciAfectadoSeleccionado = "";

        if (ciAfectadoSeleccionado != item.ci) {
            item.seleccionado = true;
            ciAfectadoSeleccionado = item.ci;
        }

    }

    $scope.btnNevaUnidadPersona = function () {
        try {
            // $rootScope.ciAfectadoSeleccionado = ciAfectadoSeleccionado;
            $location.path("/NuevoIntegrante")
        } catch (error) {
            $location.path("/NuevoIntegrante")
        }
    }

    $scope.btnSiguiente = function () {
        $rootScope.ciAfectadoSeleccionado = ciAfectadoSeleccionado;
        $location.path("/InformacionEspecificaEvento")

    }


    $scope.lnkNuevoIntegranteFamilia = function () {

    }
}]);