var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'ui.grid', 'angular-md5', 'ui.bootstrap.datetimepicker', 'angular-carousel', 'ngTouch']);

/*ENRUTAMIENTO*/
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

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


    //Verifica cada vez que cambia la url (queda escuchando)
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        var loggedIn = $rootScope.globals ? $rootScope.globals.currentUser : false;
        if (loggedIn) {
            var rolUsuario = loggedIn.rolUsuario;

            var paginasPublic = ['/nuevaTarea'];
            var paginasAdmins = [];
            var paginas = [""];

            if (rolUsuario == "admin")
                paginas = paginasAdmins;

            if (rolUsuario == "public")
                paginas = paginasPublic;

            var pag = $location.path();
            var restrictedPage = paginas.indexOf(pag) == -1 ? true : false;

            if (!restrictedPage) {
                $location.path('/home');
            }

        } else {
            var paginas = ['/registro', '/login'];
            var restrictedPage = $.inArray($location.path(), ) === -1;
            var restrictedPage = paginas.indexOf($location.path()) != -1 ? true : false;

            if (!restrictedPage) {
                $location.path('/login');
            }
        }

    });


}]);
