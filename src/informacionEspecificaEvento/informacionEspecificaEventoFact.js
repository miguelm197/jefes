app.factory("informacionEspecificaEventoFact", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaPersPorCi: function (ci) {
            return $http.get(servicio + "/personas?ci=" + ci);
        },
        actualizarPersona: function (id, persona) {
            return $http.put(servicio + "/personas/" + id, persona);
        },
    }
}]);