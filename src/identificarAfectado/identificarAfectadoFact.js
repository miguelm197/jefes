app.factory("identificarAfectadoFact", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaJefes: function () {
            return $http.get(servicio + "/personas");
        }
    }
}]);
