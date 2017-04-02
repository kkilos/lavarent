$(document).ready(function () {
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
        AjaxCargaEspecial: "../ControlEquipos/ObtEquipo",
        paramentrosCargaEspecial: function (id) {
            var parametros = '{"id_equipo":"' + id + '"}';
            return parametros;
        },
        fnCargaEspecial: function (oJson) {
            $.each(oJson, function (i, value) {
                $('#eqp-id').val(value.id_equipo);
                $("#eqp-fecha_compra").val(value.fecha_compra);
                $("#eqp-tipo_equipo").val(value.id_tipo_equipo);
                if (value.observaciones != '') {
                    $('#eqp-observaciones').summernote('editor.pasteHTML', value.observaciones);
                    console.log($('#eqp-observaciones').summernote('code'));
                }                
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


    };

    cargaCatalogos();

});