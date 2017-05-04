(function ($) {

    $.fn.todo_rentas = function (opciones) {

        var configuracionDefacto = {
            fechaSeleccionada: '',
            idListaRepartidor1: 'listaRepartidor1',
            idCantidadListaRepartidor1: 'cantListaRepartidor1',
            idListaRepartidor2: 'listaRepartidor2',
            idCantidadListaRepartidor2: 'cantListaRepartidor2'
        };

        var opciones = $.extend(configuracionDefacto, opciones);

        var fnPrivateToDo = function ($this) {
            var html = '';

            $this.empty().addClass('todo-content').addClass('scroller').css('height', $(window).height() - 300 + 'px');
            html += '<div class="row">';

            html += '<div class="col-md-6 col-sm-5">';
            html += fnPrivateGeneraRepartidor(opciones.idListaRepartidor1, opciones.idCantidadListaRepartidor1, 'Unidad de Reparto #1');
            html += '</div>';

            html += '<div class="todo-tasklist-devider"> </div>';

            html += '<div class="col-md-6 col-sm-5">';
            html += fnPrivateGeneraRepartidor(opciones.idListaRepartidor2, opciones.idCantidadListaRepartidor2, 'Unidad de Reparto #2');
            html += '</div>';

            html += '</div>';

            $this.append(html);
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../OrdenesRentas/ObtRentasDia',
                data: '{fecha:"' + opciones.fechaSeleccionada + '"}',
                success: function (oJson) {
                    var listadoRepartidor1 = '';
                    var listadoRepartidor2 = '';
                    var cantidadCitas1 = 0;
                    var cantidadCitas2 = 0;
                    $.each(oJson, function (i, value) {
                        var cantidadCitas = 0;
                        var htmlTxt = '';
                        htmlTxt += '<li class="mt-list-item ">';
                        htmlTxt += '<div class="list-icon-container"><a href="javascript:;"><i class="fa fa-angle-right"></i></a></div>';
                        htmlTxt += '<div class="list-datetime bold uppercase font-green"><i class="icon-clock"></i>' + value.horario + '</div>';


                        htmlTxt += '<div class="list-item-content ">';
                        htmlTxt += '<div class="row"><div class="col-xs-6">';
                        htmlTxt += '<span class="btn yellow btn-block btn-circle font-white"><i class="' + value.icono + '"></i> ' + value.estatus_renta + '</span>';
                        htmlTxt += '</div><div class="col-xs-6">';
                        htmlTxt += '<span class="btn yellow btn-block btn-circle font-white">' + value.tipo_cita + '</span>';
                        htmlTxt += '</div></div>';
                        if (value.estatus_renta != 'Disponible') {

                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'No. Orden Renta:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.no_orden_renta + '</b>';
                            htmlTxt += '<span class="label label-warning"><i class="' + value.icono + '"></i> <strong>' + value.estatus_renta + '</strong></span>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'No. Cliente:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.id_cliente + '</b>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'Nombre Cliente:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.nombre_completo + '</b>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'Colonia:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.colonia + '</b>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'Zona:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.zona + '</b>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'Tarifa Estimada:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.tarifa_estimada + '</b>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';

                            cantidadCitas++;
                        }
                        htmlTxt += '</div>';
                        htmlTxt += '</li>';
                        switch (value.id_repartidor) {
                            case '1':
                                listadoRepartidor1 += htmlTxt;
                                cantidadCitas1 = cantidadCitas;
                                break;
                            case '2':
                                listadoRepartidor2 += htmlTxt;
                                cantidadCitas2 = cantidadCitas;
                                break;
                        }
                    });

                    $('#' + opciones.idListaRepartidor1).empty().append(listadoRepartidor1);
                    $('#' + opciones.idListaRepartidor2).empty().append(listadoRepartidor2);
                    $('#' + opciones.idCantidadListaRepartidor1).empty().append(cantidadCitas1);
                    $('#' + opciones.idCantidadListaRepartidor2).empty().append(cantidadCitas2);
                }
            });

            

        };

        var fnPrivateGeneraRepartidor = function (idListaRepartidor,idCantidadListaRepartidor, titulo ) {
            var htmlTxt = '';           
            htmlTxt += '<div class="mt-element-list">';
            htmlTxt += '<div class="mt-list-head list-news ext-1 font-white   bg-blue-chambray">';
            htmlTxt += '<div class="list-head-title-container">';
            htmlTxt += '<h3 class="list-title">' + titulo + '</h3>';
            htmlTxt += '</div>';
            htmlTxt += '<div id="' + idCantidadListaRepartidor + '" class="list-count pull-right bg-red caption-subject bold uppercase"></div>';
            htmlTxt += '</div>';
            htmlTxt += '<div class="mt-list-container list-news">';
            htmlTxt += '<ul id="' + idListaRepartidor + '"></ul>';
            htmlTxt += '</div>';
            htmlTxt += '</div>';

            return htmlTxt;
        };

        return this.each(function () {

            var $this = $(this);
            

            fnPrivateToDo($this);

            return $this;
        });
    };
})(jQuery);







