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

    // =========================== CONFIGURACIÓN ===========================
    // Configuración de URL de la API.
    var urlServices = "http://localhost";
    var portServices = 3000;
    // =====================================================================

    app.config['urlServicios'] = urlServices + ":" + portServices;

    // Obtiene los datos almacenados en la cookie al cargar la pag.
    $rootScope.globals = $cookies.getObject('globals') || false;

    // =========================== CONFIGURACIÓN ===========================
    //En caso de usar token configurar aqui:
    if ($rootScope.globals) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    // =====================================================================


    // Verifica cada vez que cambia la url (queda escuchando).
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        // Almacena true en loggedIn si hay cookie en el navegador.
        var loggedIn = $rootScope.globals ? $rootScope.globals.currentUser : false;

        // restrictedPage booleano que permite o no el acceso a la url actual.
        var restrictedPage = false;




        // =========================== CONFIGURACIÓN ===========================

        var permisoPublico = false;  // Habilitar acceso público (sin estar logueado).
        var permisoDiRoles = false;  // Habilitar manejo de varios roles (si se desactiva solo toma en cuenta usuario admin).

        // Páginas en las cuales NO puede entrar el rol admin (se toma en cuenta una vez logueado).
        // NOTA: En caso de que no se admitan manejo de varios roles, se asigna automaticamente el arreglo de noPaginasAdmins al usuario actual.
        var noPaginasAdmins = ['/Login'];   //Rol admin.

        // Páginas que puede entrar un usuario sin estar logueado.
        var paginas = [];

        // Página a donde redirecciona si el usuario actual (logueado) no posee permisos.
        var paginaRedireSiLog = "/Home";

        // Página a donde redirecciona si el usuario actual (NO logueado) no posee permisos.
        var paginaRedireNoLog = "/Login";

        // =====================================================================



        if (loggedIn) {
            var rolUsuario = loggedIn.rolUsuario;
            var paginas = [];

            if (permisoDiRoles) {
                if (rolUsuario == "admin")
                    paginas = noPaginasAdmins;

                // =========================== CONFIGURACIÓN ===========================

                // En caso de admitir varios roles, configurar aquí.
                if (rolUsuario == "ejemplo")
                    //Páginas en las cuales NO puede entrar el rol (se toma en cuenta una vez logueado).
                    paginas = [];

                // =====================================================================

            } else {
                paginas = noPaginasAdmins;
            }

            var pag = $location.path();
            restrictedPage = paginas.indexOf(pag) == -1 ? true : false;

        } else {
            if (permisoPublico)
                restrictedPage = paginas.indexOf($location.path()) != -1 ? true : false;
        }

        // Restringe o no la url actual
        if (!restrictedPage) {
            if (loggedIn)
                $location.path(paginaRedireSiLog);
            else
                $location.path(paginaRedireNoLog);
        }


    });
}]);
