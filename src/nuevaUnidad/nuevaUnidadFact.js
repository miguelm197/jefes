app.factory("nuevaUnidadFact", ["$http", function ($http) {
    var servicio = app.config.urlServicios;

    return {
        consultaJefes: function () {
            return $http.get(servicio + "/personas");

        },
        agregarUnidad: function (objeto) {
            return $http.post(servicio + "/personas", objeto);
        },
        existenciaCi: function (ci) {
            return $http.get(servicio + "/personas?ci=" + ci);
        },
        existenciaDireccion: function (calle, numero) {
            return $http.get(servicio + "/personas?calle=" + calle + "&numero=" + numero);
        }
    }
}]);