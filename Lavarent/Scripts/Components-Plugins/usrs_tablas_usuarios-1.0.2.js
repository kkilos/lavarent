(function ($) {
    var oTableUsuarios = null;
    var oRol = null;
    console.log($(window).height());

    $.fn.tabla_usuarios = function (opciones) {
        var configuracionDefacto = {
            sAjaxSource: "../Usuarios/ObtUsuarios",
            aoColumnDefs: 
            [
                { "aTargets": [0],"sName": "guid_usuario",  "title": "#",            "bSearchable": false, "bSortable": false,"bVisible": false },
                { "aTargets": [1],"sName": "orden",         "title": "#",            "bSearchable": false, "bSortable": false,"bVisible": true },
                { "aTargets": [2],"sName": "activo",        "title": "Herramientas", "bSearchable": false, "bSortable": false,"bVisible": true },
                { "aTargets": [3],"sName": "nombre_completo","title": "Nombre completo", "bSearchable": true, "bSortable": true, "bVisible": true },
                { "aTargets": [4],"sName": "usuario",       "title": "Usuario",      "bSearchable": true,  "bSortable": true, "bVisible": true },
                { "aTargets": [5],"sName": "rol",           "title": "Rol de Acceso","bSearchable": false, "bSortable": true, "bVisible": true },
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var _guid_usuario = aData[0];
                var _usuario_activo = aData[2];
                var btnActivo = '';
                if (_usuario_activo == 1) {
                    btnActivo = '<button data-guid_usuario ="' + _guid_usuario + '" class="btnActivoRapido btn blue">Activo​</button>';
                }
                else {
                    btnActivo = '<button data-guid_usuario ="' + _guid_usuario + '" class="btnActivoRapido btn red">Inactivo</button>';
                }
                $('td:eq(1)', nRow).html(btnActivo + ' <button data-guid_usuario ="' + _guid_usuario + '" class="btnModDatos btn yellow">​<i class="icon-edit"></i> Editar </button>');
                return nRow;
            },
            order: [[3, 'asc']],
            idModalModificaUsuario: "myModaModificar",

            idModalNuevoUsuario: "myModalNuevo",
            fnLimpiaCamposNuevoUsuario: function () {
                oRol = $("#id_rol_nuevo").gral_selector_simple_rol({
                    id_rol: 1
                });
                $('#id_nombre_nuevo').val('')
                $("#id_usuario_modificar").val('');
                $("#id_contrasenia_modificar").val('');
                $("#id_comentario_modificar").val('');
                $('#id_nombre_nuevo').focus();
            }
            
        };

        var opciones = $.extend(configuracionDefacto, opciones);
        var numLinea = 0;

        var fnPrivateRedendearTabla = function ($this) {

            var optionTable = {
                "bServerSide": true,
                "bProcessing": true,
                "sAjaxSource": opciones.sAjaxSource,
                "aoColumnDefs": opciones.aoColumnDefs,
                "fnServerData": function (sSource, aoData, fnCallback) {
                    $.ajax({
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        type: 'GET',
                        url: sSource,
                        data: aoData,
                        success: function (result) {
                            numLinea = 1;
                            fnCallback(result);
                        }
                    });
                },
                fnRowCallback: opciones.fnRowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull),
                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sortDescending": ": Activar para ordenar la columna de manera descendente"
                    },
                    "emptyTable": "Ningún dato disponible en esta tabla",
                    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "search": "Buscar:",
                    "zeroRecords": "No se encontraron resultados",
                },
                // Or you can use remote translation file
                //"language": {
                //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
                //},

                // setup buttons extension: http://datatables.net/extensions/buttons/
                buttons: [
                    { extend: 'print', className: 'btn dark btn-outline' },
                    { extend: 'excelHtml5', className: 'btn yellow btn-outline' },
                    { extend: 'pdf', className: 'btn green btn-outline' },
                    { extend: 'csv', className: 'btn purple btn-outline ' }
                ],

                // scroller extension: http://datatables.net/extensions/scroller/
                scrollY: (($(window).height() - 420) > 300 ? ($(window).height() - 420) : 300) + 'px',
                deferRender: true,
                scroller: true,
                stateSave: true,
                "order": opciones.order,
                ordering: true,
                searching: true,
                "lengthMenu": [
                    [10, 15, 20, -1],
                    [10, 15, 20, "All"] // change per page values here
                ],
                // set the initial value<input type="text" class="form-control input-lg" placeholder="input-lg">
                "pageLength": 20,
                "dom": "<'row' <'col-md-12'B>><'row'<'form'<'form-body'<'form-group'<'col-md-12 col-sm-12'f>r>>>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'>>" // horizobtal scrollable datatable
                // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-12 col-sm-12'i>>"
                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i>>"
              
            };


            if (oTableUsuarios == null) {
                oTableUsuarios = $this.dataTable(optionTable);
            }
            else {
                try {
                    oTableUsuarios.fnDestroy();
                    oTableUsuarios = $this.dataTable(optionTable);
                } catch (e) {
                }
            }

            $("#btnNuevo").on("click", function () {                
                opciones.fnLimpiaCamposNuevoUsuario();
                $('#' + opciones.idModalNuevoUsuario).modal('show');
            });


            $this.on("dblclick", ".btnActivoRapido", function () {
                var _guid_usuario = $(this).attr('data-guid_usuario');
                alert(_guid_usuario);
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: '{"guid_usuario":"' + _guid_usuario + '"}',
                    url: '../Usuarios/ActUsuarioActivarDesactivar',
                    success: function (oJson) {
                        alert(oJson);
                        if (oTableUsuarios != null) {
                            oTableUsuarios.fnDraw();
                        }
                    }
                });
            });
            $this.on("click", ".btnModDatos", function () {
                var _guid_usuario = $(this).attr('data-guid_usuario');
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: '{"guid_usuario":"' + _guid_usuario + '"}',
                    url: '../Usuarios/ObtUsuario',
                    success: function (oJson) {
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

                            $('#id_btn_modificar').attr('name', _guid_usuario);
                            $('#guid_usuario_modificar').val(_guid_usuario);

                            $("#id_contrasenia_modificar").attr("type", "password");
                            $('#id_ver_contrasenia').html('ver');

                        });
                        $('#myModaModificar').modal('show');

                    }
                });

            });

        };

        $('#' + opciones.idModalModificaUsuario).on('click', '#id_ver_contrasenia', function () {
            $("#id_contrasenia_modificar").attr("type", "text");
            $('#id_ver_contrasenia').html('<i class="icon-user"></i>');
            $("#id_contrasenia_modificar").focus();
        });

        $('#' + opciones.idModalModificaUsuario).on('click', '#id_btn_modificar', function () {
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

            var params = '{' +
            '"guid_usuario":"' + guid_usuario + '",' +
            '"nombre":"' + $("#id_nombre_modificar").val() + '",' +
            '"contrasenia":"' + $("#id_contrasenia_modificar").val() + '",' +
            '"id_rol":"' + oRol.fnObtRol() + '",' +
            '"comentario":"' + $("#id_comentario_modificar").val() + '"' +
            '}';
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: params,
                url: '../Usuarios/ActUsuario',
                success: function (oJson) {
                    if (oTableUsuarios != null) {
                        oTableUsuarios.fnDraw();
                    }
                    $('#' + opciones.idModalModificaUsuario).modal('hide');

                }
            });

        });

        $('#' + opciones.idModalNuevoUsuario).on('click', '#id_btn_nuevo', function () {
            $('#' + opciones.idModalNuevoUsuario).modal('show');

            var params = '{' +
            '"nombre":"' + $("#id_nombre_nuevo").val() + '",' +
            '"usuario":"' + $("#id_usuario_nuevo").val() + '",' +
            '"contrasenia":"' + $("#id_contrasenia_nuevo").val() + '",' +
            '"id_mpo":"' + oMpo.fnObtMunicipio() + '",' +
            '"id_rol":"' + oRol.fnObtRol() + '",' +
            '"comentario":"' + $("#id_comentario_nuevo").val() + '"' +
            '}';
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: params,
                url: '../Usuarios/ActNuevoUsuario',
                success: function (oJson) {

                    if (oTableUsuarios != null) {
                        oTableUsuarios.fnDraw();
                    }
                    $('#' + opciones.idModalNuevoUsuario).modal('hide');

                }
            });

        });


        this.RecargaTabla = function () {
            if (oTableUsuarios != null) {
                oTableUsuarios.fnDraw();
            }
        }

        return this.each(function () {

            var $this = $(this);

            fnPrivateRedendearTabla($this);

            $(window).resize(function () {
                fnPrivateRedendearTabla($this);
            });

            return $this;
        });
    };

})(jQuery);