(function ($) {

    $.fn.week_timeline = function (opciones) {
        var $this;

        var configuracionDefacto = {
            fecha_seleccionada: new Date(),
            fecha_lunes: '',
            fecha_martes: '',
            fecha_miercoles: '',
            fecha_jueves: '',
            fecha_viernes: '',
            fecha_sabado: '',
            es_festivo_lunes : false,
            es_festivo_martes: false,
            es_festivo_miercoles: false,
            es_festivo_jueves: false,
            es_festivo_viernes: false,
            es_festivo_sabado: false,
            idSeleccionDia:'',
            fnOnChange: function () { }
        };

        var opciones = $.extend(configuracionDefacto, opciones);



        var fnPrivateObtenerDias = function ($this) {
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../OrdenesRentas/ObtDiasSemana',
                data: '{fecha:"' + opciones.fecha_seleccionada + '"}',
                success: function (oJson) {
                    $this.empty();
                    var html = '';
                    html += '<div class="row"><div class="col-md-12">';
                    html += '<div class="m-grid m-grid-demo"><div class="m-grid-row">';
                    var caja_fecha = 'class="mt-element-ribbon m-grid-col m-grid-col-middle m-grid-col-center m-grid-col-md-2 color-view bg-default" style="cursor:pointer"><i class="fa fa-calendar"></i>';
                    
                    var caja_fecha_festivo = 'class="mt-element-ribbon m-grid-col m-grid-col-middle m-grid-col-center m-grid-col-md-2 color-view bg-grey-gallery font-white">' +
                        '<div class="ribbon ribbon-right ribbon-round ribbon-color-info ribbon-shadow uppercase">Día Festivo</div><i class="fa fa-calendar"></i>';                    
                    $.each(oJson, function (i, value) {
                        opciones.fecha_lunes =  value.lunes;
                        opciones.fecha_martes = value.martes;
                        opciones.fecha_miercoles = value.miercoles;
                        opciones.fecha_jueves = value.jueves;
                        opciones.fecha_viernes = value.viernes;
                        opciones.fecha_sabado = value.sabado;
                        opciones.es_festivo_lunes = (value.festivo_lunes == "True" ? true : false);
                        opciones.es_festivo_martes = (value.festivo_martes == "True" ? true : false);
                        opciones.es_festivo_miercoles= (value.festivo_miercoles == "True" ? true : false);
                        opciones.es_festivo_jueves= (value.festivo_jueves == "True" ? true : false);
                        opciones.es_festivo_viernes= (value.festivo_viernes == "True" ? true : false);
                        opciones.es_festivo_sabado = (value.festivo_sabado == "True" ? true : false);
                        
                        html += '<div id="lunes"' + (value.festivo_lunes == "True" ? caja_fecha_festivo : caja_fecha);                        
                        html += 'Lunes ' + value.texto_lunes ;
                        html += '</div>';
                        html += '<div id="martes"' + (value.festivo_martes == "True" ? caja_fecha_festivo : caja_fecha);
                        html += ' Martes ' + value.texto_martes;
                        html += '</div>';
                        html += '<div id="miercoles"' + (value.festivo_miercoles == "True" ? caja_fecha_festivo : caja_fecha);
                        html += ' Miercoles ' + value.texto_miercoles;
                        html += '</div>';
                        html += '<div id="jueves"' + (value.festivo_jueves == "True" ? caja_fecha_festivo : caja_fecha);
                        html += ' Jueves ' + value.texto_jueves;
                        html += '</div>';
                        html += '<div id="viernes"' + (value.festivo_viernes == "True" ? caja_fecha_festivo : caja_fecha);
                        html += ' Viernes ' + value.texto_viernes;
                        html += '</div>';
                        html += '<div id="sabado"' + (value.festivo_sabado == "True" ? caja_fecha_festivo : caja_fecha);
                        html += ' Sabado ' + value.texto_sabado;
                        html += '</div>';

                    });

                    html += '</div></div>';
                    html += '</div></div>';
                    $this.append(html);
                }
            });

            $("#lunes").on("click", function () {
                if (!opciones.es_festivo_lunes) {
                    opciones.fecha_seleccionada = opciones.fecha_lunes;
                    $("#lunes").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#martes,#miercoles,#jueves,#viernes,#sabado").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            $("#martes").on("click", function () {
                if (!opciones.es_festivo_martes) {
                    opciones.fecha_seleccionada = opciones.fecha_martes;
                    $("#martes").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#lunes,#miercoles,#jueves,#viernes,#sabado").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            $("#miercoles").on("click", function () {
                if (!opciones.es_festivo_miercoles) {
                    opciones.fecha_seleccionada = opciones.fecha_miercoles;
                    $("#miercoles").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#lunes,#martes,#jueves,#viernes,#sabado").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            $("#jueves").on("click", function () {
                if (!opciones.es_festivo_jueves) {
                    opciones.fecha_seleccionada = opciones.fecha_jueves;
                    $("#jueves").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#lunes,#martes,#miercoles,#viernes,#sabado").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            $("#viernes").on("click", function () {
                if (!opciones.es_festivo_viernes) {
                    opciones.fecha_seleccionada = opciones.fecha_viernes;
                    $("#viernes").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#lunes,#martes,#miercoles,#jueves,#sabado").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            $("#sabado").on("click", function () {
                if (!opciones.es_festivo_sabado) {
                    opciones.fecha_seleccionada = opciones.fecha_sabado;
                    $("#sabado").removeClass('bg-default').addClass('bg-yellow').addClass('font-white').addClass('bold').addClass('uppercase');
                    $("#lunes,#martes,#miercoles,#jueves,#viernes").addClass('bg-default').removeClass('bg-yellow').removeClass('font-white').removeClass('bold').removeClass('uppercase');
                    opciones.fnOnChange(opciones.fecha_seleccionada);
                } else {
                    fnPrivateMensajeDiaFestivo();
                }
            });
            switch(opciones.fecha_seleccionada){
                case opciones.fecha_lunes:
                    $("#lunes").trigger('click');
                    break;
                case opciones.fecha_martes:
                    $("#martes").trigger('click');
                    break;
                case opciones.fecha_miercoles:
                    $("#miercoles").trigger('click');
                    break;
                case opciones.fecha_jueves:
                    $("#jueves").trigger('click');
                    break;
                case opciones.fecha_viernes:
                    $("#viernes").trigger('click');
                    break;
                case opciones.fecha_sabado:
                    $("#sabado").trigger('click');
                    break;
            }
        };

        var fnPrivateMensajeDiaFestivo = function () {
            swal({
                title: "Mensaje de información",
                text: "Intentas seleccionar un día festivo",
                type: "info",
                allowOutsideClick: "true",
                confirmButtonClass: "btn-info"
            },
            function (isConfirm) {
               // $("#busqueda_cliente").trigger("click");
            });
        };

        var fnPrivateDatePicker = function () {
            var htmlTxt = '';
            htmlTxt += '<div class="input-group input-medium date date-picker date-picker_week_timeline" data-date-format="dd-mm-yyyy" data-date-start-date="+0d">';
            htmlTxt += '<input type="text" class="form-control" readonly="">';
            htmlTxt += '<span class="input-group-btn">';
            htmlTxt += '<button class="btn default" type="button">';
            htmlTxt += '<i class="fa fa-calendar"></i>';
            htmlTxt += '</button>';
            htmlTxt += '</span>';
            htmlTxt += '</div>';
            $('#' + opciones.idSeleccionDia).addClass("col-md-12").append(htmlTxt);
            if (jQuery().datepicker) {
                $(".date-picker_week_timeline").datepicker({
                    rtl: App.isRTL(),
                    orientation: "right",
                    format: 'yyyy-mm-dd',
                    daysOfWeekDisabled: '0',
                    autoclose: true
                }).on('changeDate', function (e) {
                    fnPrivateActFecha(e.format('yyyy-mm-dd'));
                });
            }            
        };

        var fnPrivateActFecha = function (fecha) {
            console.log($this);
            opciones.fecha_seleccionada = fecha;
            fnPrivateObtenerDias($this);
        };

        this.fnActFecha = function (fecha) {
            fnPrivateActFecha(fecha);
        };


        this.fnObtFecha = function () {
            return opciones.fecha_seleccionada;
        };




        return this.each(function () {

            $this = $(this);
            fnPrivateDatePicker();
            fnPrivateObtenerDias($this);
            
            return $this;
        });
    };
})(jQuery);