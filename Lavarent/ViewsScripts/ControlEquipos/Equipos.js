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
        order: [[0, 'asc']]//,
        //idBtnGuardarModifica: "",
        //AjaxModifica: "",
        //parametrosModifica: function () { },
        //fnValidaModifica: function () { },
        //AjaxCargaEspecial: "../MembresiasClientes/ObtCliente",
        //paramentrosCargaEspecial: function (id) {
        //    var parametros = '{"id_cliente":"' + id + '"}';
        //    return parametros;
        //},
        //fnCargaEspecial: function (oJson) {
        //    $.each(oJson, function (i, value) {
        //        $('#clnt-id').val(value.id_cliente);
        //        $("#clnt-miembro_desde").val(value.miembro_desde);
        //        $("#clnt-nombre_completo").val(value.nombre_completo);
        //        $("#clnt-direccion").val(value.direccion);
        //        $("#clnt-ubicacion").val(value.datos_ubicacion);
        //        $("#clnt-telefono_casa").val(value.tel_casa);
        //        $("#clnt-telefono_celular").val(value.tel_cel);
        //        if (value.id_colonia != undefined) {
        //            $("#clnt-colonia").val(value.colonia);
        //            $("#clnt-id_colonia").val(value.id_colonia);
        //            $("#clnt-zona").val(value.zona);
        //            $("#clnt-id_zona").val(value.id_zona);
        //        }
        //        $('#clnt-ref1-nombre_completo').html(value.referencia_1_nombre);
        //        $('#clnt-ref1-tel').html(value.referencia_1_telefono);
        //        $('#clnt-ref2-nombre_completo').html(value.referencia_2_nombre);
        //        $('#clnt-ref2-tel').html(value.referencia_2_telefono);
        //        $('#clnt-observaciones').html(value.observaciones);
        //    });
        //    $("#ver-datos").trigger("click");

        //},
        //idBtnNuevo: "btnNuevo",
        //idModalNuevo: "myModalNuevo",
        //fnLimpiaCamposNuevo: function () {
        //    oRol = $("#id_rol_nuevo").gral_selector_simple_rol({});
        //    $('#id_nombre_nuevo').val('')
        //    $("#id_usuario_modificar").val('');
        //    $("#id_contrasenia_modificar").val('');
        //    $("#id_comentario_modificar").val('');
        //    $('#id_nombre_nuevo').focus();
        //},
        //idBtnGuardarNuevo: 'id_btn_nuevo' //,
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

});