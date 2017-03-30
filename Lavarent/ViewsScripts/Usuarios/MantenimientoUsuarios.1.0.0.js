$(document).ready(function () {
    App.init();
    var oRol = $("#id_rol_modificar").gral_selector_simple_rol({});
    var guid_usuario;
    var tUsuarios = $('#dtUsuarios').TablaDeDatos({
        sAjaxSource: "../Usuarios/ObtUsuarios",
        aoColumnDefs:
        [
            { "aTargets": [0], "sName": "guid_usuario", "title": "#", "bSearchable": false, "bSortable": false, "bVisible": false },
            { "aTargets": [1], "sName": "orden", "title": "#", "bSearchable": false, "bSortable": false, "bVisible": true },
            { "aTargets": [2], "sName": "activo", "title": "Herramientas", "bSearchable": false, "bSortable": false, "bVisible": true },
            { "aTargets": [3], "sName": "nombre_completo", "title": "Nombre completo", "bSearchable": true, "bSortable": true, "bVisible": true },
            { "aTargets": [4], "sName": "usuario", "title": "Usuario", "bSearchable": true, "bSortable": true, "bVisible": true },
            { "aTargets": [5], "sName": "rol", "title": "Rol de Acceso", "bSearchable": false, "bSortable": true, "bVisible": true }
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var _guid_usuario = aData[0];
            var _usuario_activo = aData[2];
            var btnActivo = '';
            if (_usuario_activo == 1) {
                btnActivo = '<button data-id ="' + _guid_usuario + '" class="btnEspecial btn blue">Activo​</button>';
            }
            else {
                btnActivo = '<button data-id ="' + _guid_usuario + '" class="btnEspecial btn red">Inactivo</button>';
            }
            $('td:eq(1)', nRow).html(btnActivo + ' <button data-id ="' + _guid_usuario + '" class="btnModDatos btn yellow">​<i class="icon-edit"></i> Editar </button>');
            return nRow;
        },
        order: [[3, 'asc']],
        idModalModifica: "myModaModificar",
        idBtnGuardarModifica: "id_btn_modificar",
        AjaxModifica: "../Usuarios/ActUsuario",
        parametrosModifica: function () {
            var parametros = '{' +
            '"guid_usuario":"' + $('#guid_usuario_modificar').val() + '",' +
            '"nombre":"' + $("#id_nombre_modificar").val() + '",' +
            '"contrasenia":"' + $("#id_contrasenia_modificar").val() + '",' +
            '"id_rol":"' + oRol.fnObtRol() + '",' +
            '"comentario":"' + $("#id_comentario_modificar").val() + '"' +
            '}';
            return parametros;
        },
        fnValidaModifica: function () {
            var guid_usuario = $('#guid_usuario_modificar').val();

            if (guid_usuario == undefined || guid_usuario == null || guid_usuario == '') return;

            $("#id_cg_nombre_modificar").removeClass("has-error");
            if ($("#id_nombre_modificar").val() == '') {
                alert("Escriba el nombre completo del usuario por favor");
                $("#id_cg_nombre_modificar").addClass("has-error");
                return;
            }
            $("#id_cg_contrasenia_modificar").removeClass("has-error");
            if ($("#id_contrasenia_modificar").val() == '') {
                alert("Escriba una contraseña por favor");
                $("#id_cg_contrasenia_modificar").addClass("has-error");
                return;
            }
        },
        parametrosCargaModifica: function (id) {
            var parametros = '{"guid_usuario":"' + id + '"}';
            return parametros;
        },
        AjaxCargaMofica: "../Usuarios/ObtUsuario",
        fnCargaModifica: function (oJson) {
            $.each(oJson, function (i, value) {
                $("#id_nombre_modificar").val(value.nombre);
                oRol = $("#id_rol_modificar").gral_selector_simple_rol({
                    id_rol: value.id_rol
                });
                $("#id_usuario_modificar").html(value.usuario);
                $("#id_contrasenia_modificar").val(value.contrasenia);
                $("#id_comentario_modificar").val(value.comentario);
                $("#id_usuario_creo").html(value.usuario_creo);
                $("#id_fechahora_creo").html(value.fh_nuevo);

                $('#id_btn_modificar').attr('name', value.guid_usuario);
                $('#guid_usuario_modificar').val(value.guid_usuario);

                $("#id_contrasenia_modificar").attr("type", "password");
                $('#id_ver_contrasenia').html('ver');
            });
        },
        AjaxCargaEspecial: "../Usuarios/ActUsuarioActivarDesactivar",
        paramentrosCargaEspecial: function (id) {
            var parametros = '{"guid_usuario":"' + id + '"}';
            return parametros;
        },
        idBtnNuevo: "btnNuevo",
        idModalNuevo: "myModalNuevo",
        fnLimpiaCamposNuevo: function () {
            oRol = $("#id_rol_nuevo").gral_selector_simple_rol({});
            $('#id_nombre_nuevo').val('')
            $("#id_usuario_modificar").val('');
            $("#id_contrasenia_modificar").val('');
            $("#id_comentario_modificar").val('');
            $('#id_nombre_nuevo').focus();
        },
        idBtnGuardarNuevo: 'id_btn_nuevo',
        AjaxNuevo: "../Usuarios/NuevoUsuario",
        parametrosNuevo: function () {
            var parametros = '{' +
            '"nombre":"' + $("#id_nombre_nuevo").val() + '",' +
            '"usuario":"' + $("#id_usuario_nuevo").val() + '",' +
            '"contrasenia":"' + $("#id_contrasenia_nuevo").val() + '",' +
            '"id_rol":"' + oRol.fnObtRol() + '",' +
            '"comentario":"' + $("#id_comentario_nuevo").val() + '"' +
            '}';
            return parametros;
        }
    });

    $('#id_ver_contrasenia').on('click', function () {
        $("#id_contrasenia_modificar").attr("type", "text");
        $('#id_ver_contrasenia').html('<i class="icon-user"></i>');
        $("#id_contrasenia_modificar").focus();
    });
});