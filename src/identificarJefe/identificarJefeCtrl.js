app.controller("identificarJefeCtrl", ["$scope", "identificarJefeFact", function ($scope, identificarJefeFact) {
    $scope.jefes = [];


    $scope.cargarjefes = function () {

        identificarJefeFact.consultaJefes().then(function (data) {
            var personas = data.data;
            var jefes = [];

            //PROVISORIO (obtiene todas las personas y filtra solo a los jefes)
            //------------------------------------------------------
            for (let i = 0; i < personas.length; i++) {
                const pers = personas[i];

                var ciJefe = pers.relacion.jefe;
                var ciPers = pers.ci;

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


}]);