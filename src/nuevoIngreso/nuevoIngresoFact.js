app.factory("NuevoIngresoFact", ["$http", function ($http) {
    var servicio = app.config.urlServicios;

    return {
        consultaJefes: function () {
            return $http.get(servicio + "/personas");
        },
      
        existenciaCi: function (ci) {
            return $http.get(servicio + "/personas?ci=" + ci);
        },
        existenciaDireccion: function (calle, numero) {
            return $http.get(servicio + "/personas?calle=" + calle + "&numero=" + numero);
        }
    }
}]);