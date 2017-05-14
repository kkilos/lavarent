$(document).ready(function () {
    if (jQuery().wysihtml5) {
        if ($('.wysihtml5').size() > 0) {
            $('.wysihtml5').wysihtml5({
                stylesheets: ["../Content/Plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css"],
                locale: "es-ES"
            });
        }
    }
    App.init();
    var tEquipos = $('#dtEquipos').TablaDeDatos({
        sAjaxSource: "../ControlEquipos/ObtEquipos",
        aoColumnDefs:
        [
             { "aTargets": [0], sWidth: "10%", "title": "No. Equipo", "bSearchable": false, "bSortable": false, "bVisible": true },
             { "aTargets": [1], sWidth: "10%", "title": "Tipo Equipo", "bSearchable": true, "bSortable": true },
             { "aTargets": [2], sWidth: "10%", "title": "Capacidad", "bSearchable": true, "bSortable": true },
             { "aTargets": [3], sWidth: "10%", "title": "Marca", "bSearchable": true, "bSortable": true },
             { "aTargets": [4], sWidth: "15%", "title": "Modelo", "bSearchable": true, "bSortable": true },
             { "aTargets": [5], sWidth: "15%", "title": "Estado Fisico", "bSearchable": true, "bSortable": true },
             { "aTargets": [6], sWidth: "10%", "title": "Estatus del equipo", "bSearchable": true, "bSortable": true },
             { "aTargets": [7], sWidth: "10%", "title": "Fecha Compra", "bSearchable": true, "bSortable": true },
             { "aTargets": [8], sWidth: "10%", "title": "Selección", "bSearchable": false, "bSortable": false }

        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(0)', nRow).attr("data-idtable", aData[0]);
            var id = aData[0];
            $('td:eq(8)', nRow).html(' <button data-id ="' + id + '" class="btnEspecial btn yellow">​<i class="icon-arrow-right"></i> Seleccionar </button>');
            return nRow;
        },
        order: [[0, 'asc']],

        idBtnGuardarModifica: "idBtnGuardaEquipo",
        AjaxModifica: "../ControlEquipos/ActEquipo",
        parametrosModifica: function () {
            var parametros = '{"id_equipo":"' + $('#eqp-id').val() + '",' +
            '"id_tipo_equipo":"' + $("#eqp-tipo_equipo").val() + '",' +
            '"id_capacidad":"' + $('#eqp-capacidad').val() + '",' +
            '"id_edo_fisico":"' + $('#eqp-edofisico').val() + '",' +
            '"id_estatus_equipo":"' + $('#eqp-estatus').val() + '",' +
            '"marca":"' + $("#eqp-marca").val() + '",' +
            '"modelo":"' + $('#eqp-modelo').val() + '",' +
            '"observaciones":"' + $('#eqp-observaciones').val() + '"' + '}';
            return parametros;
        },
        fnValidaModifica: function () {
            //validaciones para guardar
        },

        AjaxCargaEspecial: "../ControlEquipos/ObtEquipo",
        paramentrosCargaEspecial: function (id) {
            var parametros = '{"id_equipo":"' + id + '"}';
            return parametros;
        },
        fnCargaEspecial: function (oJson) {
            $.each(oJson, function (i, value) {
                console.log(value.id_estatus_equipo);
                $('#eqp-id').val(value.id_equipo);
                $("#eqp-fecha_compra").val(value.fecha_compra);
                $("#eqp-tipo_equipo").val(value.id_tipo_equipo);
                $('#eqp-tipo_equipo').trigger("change");
                setTimeout(function () {
                    $("#eqp-capacidad").val(value.id_capacidad);
                }, 100);               
                $("#eqp-edofisico").val(value.id_edo_fisico);
                $("#eqp-estatus").val(value.id_estatus_equipo);                
                $("#eqp-marca").val(value.marca);
                $("#eqp-modelo").val(value.modelo);
                $('#eqp-observaciones').data("wysihtml5").editor.setValue(value.observaciones);
                $("#clnt-direccion").val(value.direccion);              
                $("#clnt-latitud").val(value.latitud);
                $("#clnt-longitud").val(value.longitud);
                //if (value.observaciones != '') {
                //    $('#eqp-observaciones').summernote('editor.pasteHTML', value.observaciones);
                //    console.log($('#eqp-observaciones').summernote('code'));
                //}
                cargaHistorialRentas(value.id_equipo);

            });
            $("#datos_equipo").trigger("click");

        }
    });

    var cargaCatalogos = function () {

        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: "../ControlEquipos/ObtCatTipoEquipos",
            success: function (oJson) {
                $('#eqp-tipo_equipo').append($('<option>', {
                    value: 0,
                    text: "Seleccione un tipo de equipo"
                }));
                $.each(oJson, function (i, item) {
                    $('#eqp-tipo_equipo').append($('<option>', {
                        value: item.id_tipo_equipo,
                        text: item.tipo_equipo
                    }));
                });
            }
        });

        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: "../ControlEquipos/ObtCatEdoFisico",
            success: function (oJson) {
                $('#eqp-edofisico').html('');
                $('#eqp-edofisico').append($('<option>', {
                    value: 0,
                    text: "Seleccione un estado fisico"
                }));
                $.each(oJson, function (i, item) {
                    $('#eqp-edofisico').append($('<option>', {
                        value: item.id_edo_fisico,
                        text: item.edo_fisico
                    }));
                });
            }
        });




        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: "../ControlEquipos/ObtCatEstatus",
            success: function (oJson) {
                $('#eqp-estatus').html('');
                $('#eqp-estatus').append($('<option>', {
                    value: 0,
                    text: "Seleccione un estatus"
                }));
                $.each(oJson, function (i, item) {
                    $('#eqp-estatus').append($('<option>', {
                        value: item.id_estatus_equipo,
                        text: item.estatus_equipo
                    }));
                });
            }
        });



        $('#eqp-tipo_equipo').on('change', function () {
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                url: "../ControlEquipos/ObtCatCapacidad",
                data: "{id_tipo_equipo:" + $(this).val() + "}",
                success: function (oJson) {
                    $('#eqp-capacidad').html('');
                    $('#eqp-capacidad').append($('<option>', {
                        value: 0,
                        text: "Seleccione una capacidad"
                    }));
                    $.each(oJson, function (i, item) {
                        $('#eqp-capacidad').append($('<option>', {
                            value: item.id_capacidad,
                            text: item.capacidad
                        }));
                    });
                }
            });
        });
    };
    cargaCatalogos();

    var limpiarCampos = function () {
        cargaHistorialRentas(0);
        $('#eqp-id').val('')
        $('#eqp-id').val('');
        $("#eqp-fecha_compra").val('');
        $("#eqp-tipo_equipo").val('');
        $("#eqp-edofisico").val('');
        $("#eqp-estatus").val('');
        $("#eqp-marca").val('');
        $("#eqp-modelo").val('');
        $("#clnt-direccion").val('');
        $("#clnt-latitud").val('');
        $("#clnt-longitud").val('');
        $('#eqp-observaciones').data("wysihtml5").editor.setValue('');
    };

    var cargaHistorialRentas = function (id_equipo) {


        $.ajax({
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: '../ControlEquipos/ObtHistorialRentasEquipos',
            data: '{"id_equipo":"' + id_equipo + '"}',
            success: function (oJson) {
                $("#dtHistorialRentasEquipos").html('');
                $.each(oJson, function (i, value) {
                    console.log(value.no_orden_renta);

                    $("#dtHistorialRentasEquipos").append('<tr>' +
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

    $(".ValidaEquipo").on('click', function () {
        if ($('#eqp-id').val() == '') {
            swal({
                title: "Mensaje de advertencia",
                text: "Es necesario seleccionar un Equipo o agrega uno nuevo",
                type: "warning",
                allowOutsideClick: "true",
                confirmButtonClass: "btn-warning"
            },
            function (isConfirm) {
                $("#busqueda_equipo").trigger("click");
            });
        }
    });

    //$('#clnt-observaciones').summernote({
    //    height: 400,
    //    lang: 'es-ES'
    //});

    $('a[href="#tab_5_2"]').on('shown.bs.tab', function (e) {
        $("#tab_5_2").css("height", $(window).height());
        $("#eqp-portlet_datos_generales").css("height", $(window).height());
    });

    $('a[href="#tab_5_5"]').on('shown.bs.tab', function (e) {

        e.preventDefault();
        var map = new GMaps({
            div: '#clnt-ubicacion_mapa',
            lat: $("#clnt-latitud").val(),
            lng: $("#clnt-longitud").val(),
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
        } else {
            map.addMarker({
                lat: $("#clnt-latitud").val(),
                lng: $("#clnt-longitud").val()
            });
        }
        map.zoom(25);
    });
});