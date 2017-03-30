(function ($) {
    var oTable = null;
    $.fn.TablaDeDatos = function (opciones) {
        var configuracionDefacto = {
            sAjaxSource: "",
            aoColumnDefs: [],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            order: [],

            idModalModifica: "",
            idBtnGuardarModifica: "",
            AjaxModifica: "",
            parametrosModifica: function () { },
            fnValidaModifica: function () { },
            mensajeExitoModifica: "",

            paramentrosCargaModifica: function (id) { },
            AjaxCargaMofica: "",
            fnCargaModifica: function (oJson) { },
            paramentrosCargaEspecial: function (id) { },
            AjaxCargaEspecial: "",
            fnCargaEspecial: function (oJson) { },

            idBtnNuevo: "",
            idModalNuevo: "",
            fnLimpiaCamposNuevo: function () { },
            idBtnGuardarNuevo: '',
            AjaxNuevo: "",
            parametrosNuevo: function () { }
            
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
                fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    opciones.fnRowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull);
                },
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
                // setup buttons extension: http://datatables.net/extensions/buttons/
                buttons: [
                    { text: '<i class=" fa fa-print" style="padding-right:10px"></i>Imprimir', extend: 'print', className: 'btn grey-mint' },
                    { text: '<i class=" fa fa-file-excel-o" style="padding-right:10px"></i>Excel', extend: 'excelHtml5', className: 'btn green-jungle' },
                    { text: '<i class="fa fa-file-pdf-o " style="padding-right:10px"></i>PDF', extend: 'pdf', className: 'btn red' },
                    {
                        text: '<i class="fa fa-plus" style="padding-right:10px"></i>​Nuevo',
                         action: function (e, dt, node, config) {
                             opciones.fnLimpiaCamposNuevo();
                             $('#' + opciones.idModalNuevo).modal('show');                             
                         },
                         className: 'btn yellow'
                     }
                ],
                // scroller extension: http://datatables.net/extensions/scroller/
                scrollY: (($(window).height() - 500) > 300 ? ($(window).height() - 500) : 300) + 'px',
               // "scrollCollapse": true,
                scroller: {
                    loadingIndicator: true
                },
                //"paging": true,
                //deferRender: true,
                //scroller: true,
                //stateSave: true,
                "order": opciones.order,
                ordering: true,
                searching: true,
                //"lengthMenu": [
                //    [10, 15, 20, -1],
                //    [10, 15, 20, "All"] 
                //],
                //"pageLength": 20,
                "dom": "<'row' <'col-md-12 col-sm-12'B>><'row' <'col-md-12 col-sm-12'f>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'>>"

            };


            if (oTable == null) {
                oTable = $this.dataTable(optionTable);
                $('div.dataTables_filter input[type=search]').css("width", (($('div.dataTables_filter').width() - 100) > 300 ? ($('div.dataTables_filter').width() - 100) : 300) + 'px');
                $('div.dataTables_filter label').css("font-weight", "bold"); 
            }
            else {
                try {
                    oTable.fnDestroy();
                    oTable = $this.dataTable(optionTable);
                } catch (e) {
                }
            }

            

            $("#" + opciones.idBtnNuevo).on("click", function () {
                opciones.fnLimpiaCamposNuevo();
                $('#' + opciones.idModalNuevo).modal('show');
            });

            $this.on("click", ".btnEspecial", function () {
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: opciones.paramentrosCargaEspecial($(this).attr('data-id')), 
                    url: opciones.AjaxCargaEspecial,
                    success: function (oJson) {
                        opciones.fnCargaEspecial(oJson);
                        if (oTable != null) {
                            oTable.fnDraw();
                        }
                    }
                });
            });

            $this.on("click", ".btnModDatos", function () {
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    type: 'POST',
                    data: opciones.parametrosCargaModifica($(this).attr('data-id')),
                    url: opciones.AjaxCargaMofica,
                    success: function (oJson) {
                        opciones.fnCargaModifica(oJson);
                        $('#' + opciones.idModalModifica).modal('show');
                    }
                });
            });
        };
        
        $('#' + opciones.idBtnGuardarModifica).on('click',  function () {
            opciones.fnValidaModifica();
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: opciones.parametrosModifica(),
                url: opciones.AjaxModifica,
                success: function (oJson) {
                    if (oTable!= null) {
                        oTable.fnDraw();
                    }
                    swal({
                        title: "Mensaje de éxito",
                        text: opciones.mensajeExitoModifica,
                        type: "success",
                        allowOutsideClick: "true",
                        confirmButtonClass: "btn-success"
                        },
                        function (isConfirm) {
                            if ('#' + opciones.idModalModifica != '') {
                                $('#' + opciones.idModalModifica).modal('hide');
                            }                        
                    });

                    
                }
            });
        });

        $('#' + opciones.idModalNuevo).on('click', '#' + opciones.idBtnGuardarNuevo, function () {
            $('#' + opciones.idModalNuevo).modal('show');
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: opciones.parametrosNuevo(),
                url: opciones.AjaxNuevo,
                success: function (oJson) {
                    if (oTable != null) {
                        oTable.fnDraw();
                    }
                    $('#' + opciones.idModalNuevo).modal('hide');
                }
            });
        });

        this.RecargaTabla = function () {
            if (oTable != null) {
                oTable.fnDraw();
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