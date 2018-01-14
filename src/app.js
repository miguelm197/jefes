var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'angular-md5', 'ngTouch']);

/*ENRUTAMIENTO*/
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/Login', {
            templateUrl: 'src/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/NuevaUnidad', {
            templateUrl: 'src/nuevaUnidad/nuevaUnidad.html',
            controller: 'nuevaUnidadCtrl'
        })
        .when('/IdentificarJefe', {
            templateUrl: 'src/identificarJefe/identificarJefe.html',
            controller: 'identificarJefeCtrl'
        })
        .when('/InformacionEspecificaEvento', {
            templateUrl: 'src/informacionEspecificaEvento/informacionEspecificaEvento.html',
            controller: 'informacionEspecificaEventoCtrl'
        })
        .when('/InicioConJefeIntegrantes', {
            templateUrl: 'src/InicioConJefeIntegrantes/InicioConJefeIntegrantes.html',
            controller: 'InicioConJefeIntegrantesCtrl'
        })
        .when('/AgregarIntegrante', {
            templateUrl: 'src/agregarIntegrante/agregarIntegrante.html',
            controller: 'agregarIntegranteCtrl'
        })
        .when('/NuevoIntegrante', {
            templateUrl: 'src/nuevoIntegrante/nuevoIntegrante.html',
            controller: 'nuevoIntegranteCtrl'
        })
        .when('/EditarInformacion', {
            templateUrl: 'src/editarInformacion/editarInformacion.html',
            controller: 'editarInformacionCtrl'
        })

        .otherwise({ redirectTo: "/home" });

});


//Autenticacaion
app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {

    var urlServices = "http://localhost";
    var portServices = 3000;

    app.config['urlServicios'] = urlServices + ":" + portServices;

    // mantenerse logueado luego de resfrescar la pagina
    $rootScope.globals = $cookies.getObject('globals') || false;//Obtengo los valore de las cookies si hay
    // console.log($rootScope.globals);

    // $rootScope.globals = $rootScope.globals ? $rootScope.globals.currentUser : false;


    if ($rootScope.globals) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

        //Verifica la primera vez que arranca la pag
        // if ($rootScope.globals.currentUser.rolUsuario == "admin") {
        //     $location.path('/listaTareas');
        // }
        // if ($rootScope.globals.currentUser.rolUsuario == "public") {
        //     $location.path('/nuevaTarea');
        // }
    }



}]);
