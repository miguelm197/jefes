app.controller("identificarAfectadoCtrl", ["$scope", "identificarAfectadoFact", function ($scope, identificarAfectadoFact) {
    $scope.jefes = [];


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

        item.seleccionado = true;
    }

}]);