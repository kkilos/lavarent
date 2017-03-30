﻿var TableDatatablesScroller = function () {
    var initTable1 = function () {
        var table = $('#sample_1');

        var oTable = table.dataTable({
            "bServerSide": true,
            "sAjaxSource": "../MembresiasClientes/ObtClientes",                     
            "bProcessing": true,
            "aoColumnDefs": [
                        { "aTargets": [0], "title": "id_cliente", "bSearchable": false, "bSortable": true, "bVisible": false },
                        { "aTargets": [1], "aDataSort": [0, 1], Width: "20%", "title": "Nombre", "bSearchable": true, "bSortable": true },
                        { "aTargets": [2], sWidth: "30%", "title": "Dirección", "bSearchable": true, "bSortable": true },
                        { "aTargets": [3], sWidth: "10%", "title": "Ubicación", "bSearchable": true, "bSortable": true },
                        { "aTargets": [4], sWidth: "10%", "title": "Colonia", "bSearchable": true, "bSortable": true },
                        { "aTargets": [5], sWidth: "10%", "title": "Zona", "bSearchable": true, "bSortable": true },
                        { "aTargets": [6], sWidth: "10%", "title": "Teléfono Celular", "bSearchable": true, "bSortable": true },
                        { "aTargets": [7], sWidth: "10%", "title": "Teléfono fijo", "bSearchable": true, "bSortable": true }
            ],
            "fnServerData": function (sSource, aoData, fnCallback) {
                console.log(aoData);
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    type: 'GET',
                    url: sSource,
                    data: aoData,
                    success: function (result) {

                        fnCallback(result);
                    }
                });
            },
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "emptyTable":  "Ningún dato disponible en esta tabla",
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
            //buttons: [
            //    { extend: 'print', className: 'btn dark btn-outline' },
            //    { extend: 'pdf', className: 'btn green btn-outline' },
            //    { extend: 'csv', className: 'btn purple btn-outline ' }
            //],
            buttons: [
             'copy', 'csv', { extend: 'excelHtml5' }, 'pdf', 'print'
            ],
            // scroller extension: http://datatables.net/extensions/scroller/
            scrollY: 300,
            deferRender: true,
            scroller: true,
            stateSave: true,
            order: [
                [0, 'asc']
            ],
            ordering: true,
            searching: true,

            lengthMenu: [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 20,
            dom: 'Bfrti'
           // "dom": "<'row' <'col-md-12'b>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'>>" // horizobtal scrollable datatable
           // "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-12 col-sm-12'i>>"
            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i>>"
        });
        
    }

    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            initTable1();
        }

    };
}();

jQuery(document).ready(function () {
    TableDatatablesScroller.init();
});

