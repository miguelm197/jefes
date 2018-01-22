app.controller("nuevaUnidadCtrl", ["$scope", "nuevaUnidadFact", function ($scope, nuevaUnidadFact) {
    $scope.jefes = [];
    $scope.nuevaUnidad = {};
    $scope.validado = false;
    $scope.controlInputs = "form.ci.$error.required || form.nom.$error.required || form.ape.$error.required || form.cal.$error.required || form.num.$error.required || !validado"

    $scope.cargarjefes = function () {

        nuevaUnidadFact.consultaJefes().then(function (data) {
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
        if ($scope.nuevaUnidad.ci > 9000000 && $scope.nuevaUnidad.ci < 90000000) {
            $scope.validaciones.valCid.error = !true;
        }
        else {
            $scope.validaciones.valCid.error = !false;
        }

        // VALIDA NUMERO
        if ($scope.nuevaUnidad.numero > 99 && $scope.nuevaUnidad.numero < 10000 || $scope.nuevaUnidad.numero == undefined) {
            $scope.validaciones.valNum.error = !true;
        }
        else {
            $scope.validaciones.valNum.error = !false;
        }


        if (tipo != "nuevo") {

            // VALIDA EXISTENCIA CI
            var ci = $scope.nuevaUnidad.ci;

            nuevaUnidadFact.existenciaCi(ci).then(function (res) {
                var personas = res.data;

                if (personas.length > 0) {
                    $scope.validaciones.valCid.error = !false;
                    alert("Ya existe la cédula " + ci)
                }
            }, function error(err) {
                alert("Ah ocurrido un error");
            })


            // VALIDA EXISTENCIA DIRECCIÓN
            var calle = $scope.nuevaUnidad.calle;
            var numer = $scope.nuevaUnidad.numero;

            nuevaUnidadFact.existenciaDireccion(calle, numer).then(function (res) {
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

        $scope.nuevaUnidad.relacion = {
            "jefe": $scope.nuevaUnidad.ci,
            "comentario": "mismo"
        };

        nuevaUnidadFact.agregarUnidad($scope.nuevaUnidad).then(function () {
            $scope.cargarjefes();
        }, function error(err) {
            alert("Ah ocurrido un error");
        })


    }
}]);    