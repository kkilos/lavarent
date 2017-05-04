$(document).ready(function () {
    App.init();
    var fechaHoy = moment().format('YYYY-MM-DD');
    
   var seleccion_dias = $('#seleccion_dias').week_timeline({
        fecha_seleccionada: fechaHoy,
        fnOnChange: function (fecha) {

            $("#ToDoRentas").todo_rentas({ "fechaSeleccionada": fecha });
            //$.ajax({
            //    dataType: 'json',
            //    contentType: "application/json; charset=utf-8",
            //    type: 'POST',
            //    async: false,
            //    url: '../OrdenesRentas/ObtRentasDia',
            //    data: '{fecha:"' + fecha + '"}',
            //    success: function (oJson) {
            //        var listadoRepartidor1 = '';
            //        var listadoRepartidor2 = '';
            //        var cantidadCitas1 = 0;
            //        var cantidadCitas2 = 0;
            //        $.each(oJson, function (i, value) {
            //            var cantidadCitas = 0;
            //            var htmlTxt = '';
            //            htmlTxt += '<li class="mt-list-item ">';
            //            htmlTxt += '<div class="list-icon-container"><a href="javascript:;"><i class="fa fa-angle-right"></i></a></div>';
            //            htmlTxt += '<div class="list-datetime bold uppercase font-green"><i class="icon-clock"></i>' + value.horario + '</div>';


            //            htmlTxt += '<div class="list-item-content ">';
            //            htmlTxt += '<div class="row"><div class="col-xs-6">';
            //            htmlTxt += '<span class="btn yellow btn-block btn-circle font-white"><i class="' + value.icono + '"></i> ' + value.estatus_renta + '</span>';
            //            htmlTxt += '</div><div class="col-xs-6">';
            //            htmlTxt += '<span class="btn yellow btn-block btn-circle font-white">' + value.tipo_cita + '</span>';
            //            htmlTxt += '</div></div>';
            //            if (value.estatus_renta != 'Disponible') {



            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'No. Orden Renta:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.no_orden_renta + '</b>';
            //                htmlTxt += '<span class="label label-warning"><i class="' + value.icono + '"></i> <strong>' + value.estatus_renta + '</strong></span>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'No. Cliente:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.id_cliente + '</b>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'Nombre Cliente:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.nombre_completo + '</b>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'Colonia:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.colonia + '</b>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'Zona:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.zona + '</b>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="row static-info">';
            //                htmlTxt += '<div class="col-md-5 name">';
            //                htmlTxt += 'Tarifa Estimada:';
            //                htmlTxt += '</div>';
            //                htmlTxt += '<div class="col-md-7 value">';
            //                htmlTxt += '<b>' + value.tarifa_estimada + '</b>';
            //                htmlTxt += '</div>';
            //                htmlTxt += '</div>';

            //                //htmlTxt += '<br/>';
            //                //htmlTxt += '<span>No. Orden Renta: <b>' + value.no_orden_renta + '</b></span><br />';
            //                //htmlTxt += 'No. Cliente:<b>' + value.id_cliente + '</b><br />';
            //                //htmlTxt += 'Nombre Cliente: <b>' + value.nombre_completo + '</b><br />';
            //                //htmlTxt += 'Colonia: <b>' + value.colonia + '</b><br />';
            //                //htmlTxt += 'Zona:<b>' + value.zona + '</b><br />';
            //                //htmlTxt += 'Tarifa Estimada:<b>' + value.tarifa_estimada + '</b>';
            //                cantidadCitas++;
            //            }
            //            htmlTxt += '</div>';
            //            htmlTxt += '</li>';
            //            switch (value.id_repartidor) {
            //                case '1':
            //                    listadoRepartidor1 += htmlTxt;
            //                    cantidadCitas1 = cantidadCitas;
            //                    break;
            //                case '2':
            //                    listadoRepartidor2 += htmlTxt;
            //                    cantidadCitas2 = cantidadCitas;
            //                    break;
            //            }
            //        });
            //        $('#listaRepartidor1').html('');
            //        $('#listaRepartidor2').html('');
            //        $('#listaRepartidor1').append(listadoRepartidor1);
            //        $('#listaRepartidor2').append(listadoRepartidor2);
            //    }
            //});
        }
    });

    //if (jQuery().datepicker) {
    //    $('.date-picker').datepicker({
    //        rtl: App.isRTL(),
    //        orientation: "right",
    //        format: 'yyyy-mm-dd',
    //        daysOfWeekDisabled:'0',
    //        autoclose: true
    //    }).on('changeDate', function (e) {
    //      seleccion_dias.fnActFecha(e.format('yyyy-mm-dd'));            
    //    });
    //}


});