app.factory("nuevoIntegranteFact", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {

        agregarIntegrante: function (objeto) {
            return $http.post(servicio + "/personas", objeto);
        },

    }
}]);