(function ($) {

    $.fn.todo_rentas = function (opciones) {

        var configuracionDefacto = {
            fechahoraSeleccionada:'',
            fechaSeleccionada: '',
            idListaRepartidor1: 'listaRepartidor1',
            idCantidadListaRepartidor1: 'cantListaRepartidor1',
            idListaRepartidor2: 'listaRepartidor2',
            idCantidadListaRepartidor2: 'cantListaRepartidor2',
            repartidorSeleccionado: 1
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
                        var htmlTxt = '';
                        htmlTxt += '<li class="mt-list-item ">';
                       // htmlTxt += '<div class="list-icon-container"><a href="javascript:;"><i class="fa fa-angle-right"></i></a></div>';
                        htmlTxt += '<div class="list-datetime bold uppercase font-green"><i class="icon-clock"></i> ' + value.horario ;
                        htmlTxt += '<div class="row pull-right">';
                        htmlTxt += '<input type="checkbox" data-id="' + value.id_renta + '" data-id_repartidor="' + value.id_repartidor +'" data-hora_inicio="' + value.hora_inicio + '" data-size="mini" class="make-switch diponibilidadRenta" data-on-color="success" data-off-color="danger" data-on-text="Disponible" data-off-text="Ocupado"';
                        if (value.estatus_renta == 'Disponible') {                            
                            htmlTxt += 'checked>';
                        } else {
                            htmlTxt += 'readonly>';
                        }
                        htmlTxt += '</div>';
                        htmlTxt += '</div>';
                        htmlTxt += '<div class="list-item-content ">';   
                        //htmlTxt += '<div class="row"><div class="col-xs-6">';
                        //htmlTxt += '<span class="btn yellow btn-block btn-circle font-white"><i class="' + value.icono + '"></i> ' + value.estatus_renta + '</span>';
                        //htmlTxt += '</div><div class="col-xs-6">';
                        //htmlTxt += '<span class="btn yellow btn-block btn-circle font-white">' + value.tipo_cita + '</span>';
                        //htmlTxt += '</div></div>';
                        if (value.estatus_renta != 'Disponible') {

                            htmlTxt += '<div class="row static-info" >';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'No. Orden Renta:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.no_orden_renta + '</b>  ';
                            htmlTxt += '<span class="label label-info pull-right"><i class="' + value.icono + '"></i> <strong>' + value.estatus_renta + '</strong></span>';
                            htmlTxt += '</div>';
                            htmlTxt += '</div>';

                            htmlTxt += '<div class="row static-info">';
                            htmlTxt += '<div class="col-md-5 name">';
                            htmlTxt += 'Tipo de Cita:';
                            htmlTxt += '</div>';
                            htmlTxt += '<div class="col-md-7 value">';
                            htmlTxt += '<b>' + value.tipo_cita + '</b>';
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
                        }
                        htmlTxt += '</div>';
                        htmlTxt += '</li>';
                        switch (value.id_repartidor) {
                            case '1':
                                listadoRepartidor1 += htmlTxt;
                                if (value.estatus_renta != 'Disponible') {
                                    cantidadCitas1++;
                                }
                                break;
                            case '2':
                                listadoRepartidor2 += htmlTxt;
                                if (value.estatus_renta != 'Disponible') {
                                    cantidadCitas2++;
                                }
                                break;
                        }
                    });

                    $('#' + opciones.idListaRepartidor1).empty().append(listadoRepartidor1);
                    $('#' + opciones.idListaRepartidor2).empty().append(listadoRepartidor2);
                    $('#' + opciones.idCantidadListaRepartidor1).empty().append(cantidadCitas1);
                    $('#' + opciones.idCantidadListaRepartidor2).empty().append(cantidadCitas2);

                    if ($().bootstrapSwitch) {
                        $('.make-switch').bootstrapSwitch();
                    }
                    
                }
            });
            
            $(".diponibilidadRenta").on("switchChange.bootstrapSwitch", function (event, state) {
                opciones.fechahoraSeleccionada = opciones.fechaSeleccionada + " " + $(this).attr("data-hora_inicio");
                opciones.repartidorSeleccionado = $(this).attr("data-id_repartidor");
                
                if (!state) {
                    setTimeout(function () {
                        $("#tipoEquipos").cteq_selector_tipo_equipo({
                            id_tipo_equipo: 1,
                            fnOnChange: function (id_tipo_equipo, tipo_equipo) {

                                $("#id_numero_equipos").val(0);
                                fnPrivateBuscaEquiposDisponibles(id_tipo_equipo, tipo_equipo);
                                //$.ajax({
                                //    dataType: 'json',
                                //    contentType: "application/json; charset=utf-8",
                                //    type: 'POST',
                                //    async: false,
                                //    url: '../OrdenesRentas/ObtEquiposDisponibles',
                                //    data: '{fecha_propuesta:"' + opciones.fechaSeleccionada + '",' +
                                //    'numero_de_semnas_propuesta:"' + $("#id_numero_semanas").val() + '",' +
                                //    'id_tipo_equipo:"' + id_tipo_equipo + '"}',
                                //    success: function (oJson) {
                                //        $.each(oJson, function (i, value) {
                                //            $("#id_numero_equipos").attr("max", value.numero_de_equipos_disponibles);
                                //        });
                                //    }
                                //});
                            }
                        });
                        $("#ModalNuevaRenta").modal("show");
                    }, 400);
                }

            });

        };

        var fnPrivateBuscaEquiposDisponibles = function (id_tipo_equipo, numero_semanas) {


            $("#id_numero_equipos").attr("max", 0);
            $("#id_maximo_numero_equipos").text("Máximo:" + 0 + " Equipos disponibles");
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../OrdenesRentas/ObtEquiposDisponibles',
                data: '{fecha_propuesta:"' + opciones.fechaSeleccionada + '",' +
                'numero_de_semnas_propuesta:"' + numero_semanas + '",' +
                'id_tipo_equipo:"' + id_tipo_equipo + '"}',
                success: function (oJson) {
                    $.each(oJson, function (i, value) {
                        $("#id_numero_equipos").attr("max", value.numero_de_equipos_disponibles);
                        $("#id_maximo_numero_equipos").text("Máximo:" + value.numero_de_equipos_disponibles + " Equipos disponibles");
                       
                    });
                }
            });
        };

        $("#btnNuevaCitaInstalacion").on("click", function () {


            if ($('#id_numero_equipos').val() > 0) {
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                url: '../MembresiasClientes/ActCitaInstalacion',
                data: '{ "id_cliente":"' + $('#clnt-id').val() + '",' +
                'id_tipo_equipo:"' + $("#tipoEquipos").val() + '",' +
                'numero_semanas:"' + $("#id_numero_semanas").val() + '",' +
                'id_repartidor:"' + opciones.repartidorSeleccionado + '",' +
                'fecha_hora:"' + opciones.fechahoraSeleccionada + '"}',
                success: function (oJson) {
                    $("#ModalNuevaRenta").modal("hide");
                }
            });
            }


            
        });



        $("#id_numero_semanas").on("keyup change click", function () {
            fnPrivateBuscaEquiposDisponibles($("#tipoEquipos").val(),$("#id_numero_semanas").val());
        });

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







