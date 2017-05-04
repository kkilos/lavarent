$(document).ready(function () {
    var fechaHoy = moment().format('YYYY-MM-DD');
    var seleccion_dias = $('#seleccion_dias').week_timeline({
        fecha_seleccionada: fechaHoy,
        idSeleccionDia: "DatePickerSeleccionDias",
        fnOnChange: function (fecha) {
            $("#ToDoRentas").todo_rentas({ "fechaSeleccionada": fecha });
        }
    });

    var inicializacionComponentes = function () {
        $(".mascara_telefono").inputmask("mask", {
            "mask": "(999) 999-9999"
        });

        if (jQuery().wysihtml5) {
            if ($('.wysihtml5').size() > 0) {
                $('.wysihtml5').wysihtml5({
                    stylesheets: ["../Content/Plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css"],
                    locale: "es-ES"
                });
            }
        }


    }; 
    
    App.init();
    inicializacionComponentes();

    var tClientes = $('#dtClientes').TablaDeDatos({
        sAjaxSource: "../MembresiasClientes/ObtClientes",
        aoColumnDefs:
        [
             { "aTargets": [0], sWidth: "5%",  "title": "No. Cliente", "bSearchable": false, "bSortable": false, "bVisible": true },
             { "aTargets": [1], sWidth: "20%", "title": "Nombre", "bSearchable": true, "bSortable": true },
             { "aTargets": [2], sWidth: "20%", "title": "Dirección", "bSearchable": true, "bSortable": true },
             { "aTargets": [3], sWidth: "10%", "title": "Ubicación", "bSearchable": true, "bSortable": true },
             { "aTargets": [4], sWidth: "10%", "title": "Colonia", "bSearchable": true, "bSortable": true },
             { "aTargets": [5], sWidth: "10%", "title": "Zona", "bSearchable": true, "bSortable": true },
             { "aTargets": [6], sWidth: "10%", "title": "Teléfono Celular", "bSearchable": true, "bSortable": true },
             { "aTargets": [7], sWidth: "10%", "title": "Teléfono fijo", "bSearchable": true, "bSortable": true },
             { "aTargets": [8], sWidth: "5%",  "title": "Selección", "bSearchable": false, "bSortable": false }
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(0)', nRow).attr("data-idtable", aData[0]);
            var id = aData[0];
            $('td:eq(8)', nRow).html(' <button data-id ="' + id + '" class="btnEspecial btn yellow">​<i class="icon-arrow-right"></i> Seleccionar </button>');
            return nRow;
        },
        order: [[0, 'asc']],
        idBtnGuardarModifica: "idBtnGuardaCliente",
        AjaxModifica: "../MembresiasClientes/ActCliente",
        parametrosModifica: function () {
            var vlatitud = $('#clnt-latitud').val() == '' ? 0 : $('#clnt-latitud').val();
            var vlongitud = $('#clnt-longitud').val() == '' ? 0 : $('#clnt-longitud').val();

            var parametros = '{"id_cliente":"' + $('#clnt-id').val() + '",' +
            '"nombre_completo":"' + $('#clnt-nombre_completo').val() + '",' +
            '"direccion":"' + $('#clnt-direccion').val() + '",' +
            '"datos_ubicacion":"' + $('#clnt-ubicacion').val() + '",' +
            '"latitud":"' + vlatitud + '",' +
            '"longitud":"' + vlongitud + '",' +
            '"id_colonia":"' + $('#clnt-id_colonia').val() + '",' +
            '"tel_casa":"' + $('#clnt-telefono_casa').val() + '",' +
            '"tel_cel":"' + $('#clnt-telefono_celular').val() + '",' +
            '"referencia_1_nombre":"' + $('#clnt-ref1-nombre_completo').val() + '",' +
            '"referencia_1_telefono":"' + $('#clnt-ref1-tel').val() + '",' +
            '"referencia_2_nombre":"' + $('#clnt-ref2-nombre_completo').val() + '",' +
            '"referencia_2_telefono":"' + $('#clnt-ref2-tel').val() + '",' +
            '"identificacion_id_estatus_imagen":"' + $('#clnt-identificacion_fotografia-calidad').val() + '",' +
            '"observaciones":"' + $('#clnt-observaciones').val() + '"' + '}';
            subirImagenIdentificacion();
            subirImagenComprobante();
            return parametros;
        },
        fnValidaModifica: function () {
            //validaciones para guardar 
            if ($('#clnt-nombre_completo').val() == '') {
                alert("Por favor escriba el nombre completo");
                return;
            }            
        },
        AjaxCargaEspecial: "../MembresiasClientes/ObtCliente",
        paramentrosCargaEspecial: function (id) {
            var parametros = '{"id_cliente":"' + id + '"}';
            return parametros;
        },
        fnCargaEspecial: function (oJson) {
            limpiarCampos();
            $.each(oJson, function (i, value) {
                
                $('#clnt-id').val(value.id_cliente);
                $("#clnt-miembro_desde").val(value.miembro_desde);
                $("#clnt-nombre_completo").val(value.nombre_completo);
                $("#clnt-direccion").val(value.direccion);
                $("#clnt-ubicacion").val(value.datos_ubicacion);
                $("#clnt-latitud").val(value.latitud);
                $("#clnt-longitud").val(value.longitud);
                $("#clnt-telefono_casa").val(value.tel_casa);
                $("#clnt-telefono_celular").val(value.tel_cel);
                if (value.id_colonia != undefined) {
                    $("#clnt-colonia").val(value.colonia);
                    $("#clnt-id_colonia").val(value.id_colonia);
                    $("#clnt-zona").val(value.zona);
                    $("#clnt-id_zona").val(value.id_zona);
                } else {
                    $("#clnt-colonia").val('');
                    $("#clnt-id_colonia").val('');
                    $("#clnt-zona").val('');
                    $("#clnt-id_zona").val('');
                }
                
                $('#clnt-ref1-nombre_completo').val(value.referencia_1_nombre);
                $('#clnt-ref1-tel').val(value.referencia_1_telefono);
                $('#clnt-ref2-nombre_completo').val(value.referencia_2_nombre);
                $('#clnt-ref2-tel').val(value.referencia_2_telefono);
                $('#clnt-observaciones').data("wysihtml5").editor.setValue(value.observaciones);

                $('#clnt-identificacion_imagen').attr("src", "../MembresiasClientes/ObtClienteIdentificacion?id_cliente=" + value.id_cliente);
                $('#clnt-identificacion_fotografia-calidad').val(value.identificacion_id_estatus_imagen);
                $('#clnt-identificacion_fotografia-fecha').val(value.identificacion_fecha_hora_mod);
                $('#clnt-comprobante_imagen').attr("src", "../MembresiasClientes/ObtClienteComprobante?id_cliente=" + value.id_cliente);
                $('#clnt-comprobante_domicilio-calidad').val(value.comprobante_id_estatus_imagen);
                $('#clnt-comprobante_domicilio-fecha').val(value.comprobante_fecha_hora_mod);

                
                cargaHistorialRentas(value.id_cliente);                

            });
            $("#datos_membresia").trigger("click");
           
        },
        idBtnNuevo: "btnNuevo",
        idModalNuevo: "myModalNuevo",
        fnLimpiaCamposNuevo: function () {

            $("#btnNuevo").on('click', function () {
                limpiarCampos();                
                $('#myModalNuevo').modal('hide');
                $("#datos_membresia").trigger("click");


            });
        },
        idBtnGuardarNuevo: 'id_btn_nuevo' //,
        //AjaxNuevo: "../Usuarios/NuevoUsuario",
        //parametrosNuevo: function () {
        //    var parametros = '{' +
        //    '"nombre":"' + $("#id_nombre_nuevo").val() + '",' +
        //    '"usuario":"' + $("#id_usuario_nuevo").val() + '",' +
        //    '"contrasenia":"' + $("#id_contrasenia_nuevo").val() + '",' +
        //    '"id_rol":"' + oRol.fnObtRol() + '",' +
        //    '"comentario":"' + $("#id_comentario_nuevo").val() + '"' +
        //    '}';
        //    return parametros;
        //}
    });

    var limpiarCampos = function () {
        cargaHistorialRentas(0);
        $('#clnt-id').val('Creando Nuevo Usuario')
        $("#clnt-miembro_desde").val('');
        $("#clnt-nombre_completo").val($("#id_nombre_nuevo").val());
        $("#clnt-direccion").val('');
        $("#clnt-ubicacion").val('');
        $("#clnt-latitud").val('');
        $("#clnt-longitud").val('');
        $("#clnt-telefono_casa").val('');
        $("#clnt-telefono_celular").val('');
        $("#clnt-colonia").val('');
        $("#clnt-id_colonia").val('');
        $("#clnt-zona").val('');
        $("#clnt-id_zona").val('');
        $('#clnt-ref1-nombre_completo').val('');
        $('#clnt-ref1-tel').val('');
        $('#clnt-ref2-nombre_completo').val('');
        $('#clnt-ref2-tel').val('');
        $('#clnt-identificacion_fotografia-calidad').val("0");
        $('#clnt-identificacion_fotografia-fecha').val("Sin identificación con fotografía");
        $('#clnt-identificacion_fotografia-imagen').fileinput('reset');
        $('#clnt-identificacion_imagen').attr("src", "~/Content/img/imagen-no-disponible.jpg"); 
        $('#clnt-comprobante_domicilio-calidad').val("0");
        $('#clnt-comprobante_domicilio-fecha').val("Sin Comprobante de domicilio");
        $('#clnt-comprobante_domicilio-imagen').fileinput('reset');
        $('#clnt-comprobante_imagen').attr("src", "~/Content/img/imagen-no-disponible.jpg");
        $('#clnt-observaciones').data("wysihtml5").editor.setValue('');
    };
 

    var subirImagenIdentificacion = function () {
        var data = new FormData();

        var files = $("#clnt-identificacion").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }

        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "../MembresiasClientes/ActClienteIdentificacion?id_cliente=" + $('#clnt-id').val() + "&identificacion_id_estatus_imagen=1" ,
            contentType: false,
            processData: false,
            data: data
        });
        $('#clnt-identificacion_fotografia-calidad').val("1");
        $('#clnt-identificacion_fotografia-fecha').val(fechaHoy);
    };


    var subirImagenComprobante = function () {
        var data = new FormData();

        var files = $("#clnt-comprobante").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }

        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "../MembresiasClientes/ActClienteComprobante?id_cliente=" + $('#clnt-id').val() + "&comprobante_id_estatus_imagen=1",
            contentType: false,
            processData: false,
            data: data
        });
        $('#clnt-comprobante_domicilio-calidad').val("1");
        $('#clnt-comprobante_domicilio-fecha').val(fechaHoy);
    };

    //$("#idBtnGuardaIdentificacion").on("click", function () {

    //    subirImagenIdentificacion();

    //    swal({
    //        title: "Mensaje de Confirmación",
    //        text: "Se guardo la imagen",
    //        type: "success",
    //        allowOutsideClick: "true",
    //        confirmButtonClass: "btn-success"
    //    });
    //});

    var cargaHistorialRentas = function (_id_cliente) {

        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: '../MembresiasClientes/ObtHistorialRentas',
            data: '{"id_cliente":"' + _id_cliente + '"}',
            success: function (oJson) {
                $("#dtHistorialRentas").html('');
                $.each(oJson, function (i, value) {
                    $("#dtHistorialRentas").append('<tr>' +
                    '<td>' + value.no_orden_renta + '</td>' +
                    '<td>' + value.id_cliente + '</td>' +
                    '<td>' + value.repartidores + '</td>' +
                    '<td>' + value.estatus_renta + '</td>' +
                    '<td>' + value.fecha_inicio + '</td>' +
                    '<td>' + value.tarifa_estimada + '</td>' +
                    '</tr>');
                });
            }
        });
    };
    
    $(".ValidaCliente").on('click', function () {
        if ($('#clnt-id').val() == '') {
            swal({
                title: "Mensaje de advertencia",
                text: "Es necesario seleccionar un cliente o agrega uno nuevo",
                type: "warning",
                allowOutsideClick: "true",
                confirmButtonClass: "btn-warning"
            },
            function(isConfirm){
                $("#busqueda_cliente").trigger("click");
			});
        }
    });


    $("#cln-btn-buscar-colonia").on('click', function () {
        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: '../MembresiasClientes/ObtColonias',
            data: '{"colonia":"' + $("#cln-txt-buscar-colonia").val() + '"}' ,
            success: function (oJson) {               
                $("#cln-tabla-colonias").html('');
                $.each(oJson, function (i, value) {
                    $("#cln-tabla-colonias").append('<tr>'+
                    '<td class="table-date">' + value.colonia + '</td>' +
                    '<td class="table-title">' + value.codigo_postal + '</td>' +
                    '<td class="table-desc">' + value.zona  + '</td>' +
                    '<td class="table-download"> <button data-id="' + value.id_colonia + '" data-colonia="' + value.colonia + '" data-zona="' + value.zona + '" class="cln-btn-selecciona-colonia btn yellow"><i class="icon-arrow-right"></i>Seleccionar</button> </td>' +
                    '</tr>');                    
                });
                $(".cln-btn-selecciona-colonia").on('click', function () {

                    $("#clnt-id_colonia").val($(this).attr('data-id'));
                    $("#clnt-colonia").val($(this).attr('data-colonia'));
                    $("#clnt-zona").val($(this).attr('data-zona'));
                    $('#modal-cambia-colonia').modal('hide');
                });
            }
        });
    });


    $("#btn-cambia-colonia").on('click', function () {
        $("#cln-txt-buscar-colonia").val('');
        $("#cln-tabla-colonias").html('');
        $('#modal-cambia-colonia').modal('show');
        $("#cln-txt-buscar-colonia").focus();
    });

    $("#cln-txt-buscar-colonia").keypress(function (e) {
        if (e.which == 13) {
            $("#cln-btn-buscar-colonia").trigger("click");
        }
    });

    $('a[href="#tab_5_2"]').on('shown.bs.tab', function (e) {
        $("#tab_5_2").css("height", $(window).height());
        $("#clnt-portlet_datos_generales").css("height", $(window).height() + 'px');
    });
    
    $('a[href="#tab_5_3"]').on('shown.bs.tab', function (e) {

        e.preventDefault();
        var map = new GMaps({
            div: '#clnt-ubicacion_mapa',
            lat:  $("#clnt-latitud").val(),       
            lng:  $("#clnt-longitud").val(),
            click: function (e) {
                map.removeMarkers();
                    map.addMarker({                    
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    title: 'Nueva Ubicación'
                    });
                    $("#clnt-latitud").val(e.latLng.lat());
                    $("#clnt-longitud").val(e.latLng.lng());
            }
        });
        $("#clnt-ubicacion_mapa").css("width", $(window).width()).css("height", $(window).height() - 300);
        if (($("#clnt-latitud").val() == '' && $("#clnt-longitud").val() == '') || ($("#clnt-latitud").val() == '0' && $("#clnt-longitud").val() == '0')) {
            GMaps.geocode({
            address: ($("#clnt-direccion").val().trim() + ", Hermosillo, Sonora"),
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng.lat(), latlng.lng());
                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
            });
        } else
        {
            map.addMarker({
                lat: $("#clnt-latitud").val(),
                lng: $("#clnt-longitud").val()
            });
        }

        map.zoom(25);
    });


    

});