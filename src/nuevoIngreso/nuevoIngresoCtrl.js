app.controller("NuevoIngresoCtrl", ["$scope", "NuevoIngresoFact", function ($scope, NuevoIngresoFact) {
    $scope.jefes = [];
    $scope.NuevoIngreso = {};
    $scope.validado = false;
    $scope.controlInputs = "form.ci.$error.required || form.nom.$error.required || form.ape.$error.required || form.cal.$error.required || form.num.$error.required || !validado"

    $scope.cargarjefes = function () {

        NuevoIngresoFact.consultaJefes().then(function (data) {
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


    $scope.validaciones = {
        valCid: { error: false },
        valNum: { error: false },
        valCal: { error: false },
        priVal: { valCid: false, valNum: false, valCal: false }
    }
    $scope.validarCampos = function (tipo) {

        // VALIDA CI
        if ($scope.NuevoIngreso.ci > 9000000 && $scope.NuevoIngreso.ci < 90000000) {
            $scope.validaciones.valCid.error = !true;
        }
        else {
            $scope.validaciones.valCid.error = !false;
        }

        // VALIDA NUMERO
        if ($scope.NuevoIngreso.numero > 99 && $scope.NuevoIngreso.numero < 10000 || $scope.NuevoIngreso.numero == undefined) {
            $scope.validaciones.valNum.error = !true;
        }
        else {
            $scope.validaciones.valNum.error = !false;
        }


        if (tipo != "nuevo") {

            // VALIDA EXISTENCIA CI
            var ci = $scope.NuevoIngreso.ci;

            NuevoIngresoFact.existenciaCi(ci).then(function (res) {
                var personas = res.data;

                if (personas.length > 0) {
                    $scope.validaciones.valCid.error = !false;
                    alert("Ya existe la cédula " + ci)
                }
            }, function error(err) {
                alert("Ah ocurrido un error");
            })


            // VALIDA EXISTENCIA DIRECCIÓN
            var calle = $scope.NuevoIngreso.calle;
            var numer = $scope.NuevoIngreso.numero;

            NuevoIngresoFact.existenciaDireccion(calle, numer).then(function (res) {
                var personas = res.data;

                console.log(personas)
                if (personas.length > 0) {
                    $scope.validaciones.valNum.error = !false;
                    $scope.validaciones.valCal.error = !false;
                    alert("Ya existe la unidad en " + calle + " " + numer)
                }else{
                    $scope.validaciones.valNum.error = !true;
                    $scope.validaciones.valCal.error = !true;
                }
            }, function error(err) {
                alert("Ah ocurrido un error");
            })








        }





        if (!$scope.validaciones.valCid.error && !$scope.validaciones.valNum.error && !$scope.validaciones.valCal.error)
            $scope.validado = true;
        else
            $scope.validado = false;




    }

    $scope.agregarJefe = function () {

        // validarCampos("nuevo");

        $scope.NuevoIngreso.relacion = {
            "jefe": $scope.NuevoIngreso.ci,
            "comentario": "mismo"
        };

        NuevoIngresoFact.agregarUnidad($scope.NuevoIngreso).then(function () {
            $scope.cargarjefes();
        }, function error(err) {
            alert("Ah ocurrido un error");
        })


    }
}]);    