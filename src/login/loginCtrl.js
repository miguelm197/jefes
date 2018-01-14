app.controller("loginCtrl", ["$scope", "loginFact", "$location", "md5", function ($scope, loginFact, $location, md5) {



    $scope.login = function (correo, clave) {
        correo = correo.$viewValue;
        clave = clave.$viewValue;

        var claveUs = md5.createHash(clave);
        var claveBD = md5.createHash("1234");


        //mientras no haya back se usa esto
        var datos = {
            rol: "admin",
            nombre: "Miguel",
            apellido: "Merelli"
        }


        if (claveUs == claveBD) {
            var rolUsuario = datos.rol;
            var nombre = datos.nombre;
            var apellido = datos.apellido;
            loginFact.setCredentials(correo, clave, rolUsuario, nombre, apellido);
            $location.path('/home');
        } else {
            alertify.dialog('alert').set({ transition: 'flipx', message: 'Contraseña incorrecta' }).show();
            $(".ajs-header").text("Login");
        }




    }

}]);