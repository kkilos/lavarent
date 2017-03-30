(function ($) {

    $.fn.gral_menu_accesos = function (opciones) {

        var configuracionDefacto = {
            
        };

        var opciones = $.extend(configuracionDefacto, opciones);


        var fnPrivateRedendeaMenu = function ($this) {

            $this.html(
            '<li><a href="' + ligaWrapperEstatal + 'accion=Index&amp;controlador=Semaforo"><i class="icon-caret-right"></i> Semáforo Delictivo</a></li>' +
			'<li><a href="' + ligaWrapper + 'accion=Incidencia&amp;controlador=Semaforo"><i class="icon-caret-right"></i> Incidencia</a></li>' +
            '<li><a href="' + ligaWrapper + 'accion=Perfil&amp;controlador=Semaforo"><i class="icon-caret-right"></i>  Perfil Delictivo</a></li>' +
            '<li><a href="' + ligaWrapper + 'accion=ComparativoAnual&amp;controlador=Semaforo"><i class="icon-caret-right"></i>  Comparativo</a></li>' +
            '<li><a href="' + ligaWrapper + 'accion=Ultimos5Anios&amp;controlador=Semaforo"><i class="icon-caret-right"></i>  Últimos 5 años</a></li>' +
            '<li><a href="' + ligaWrapper + 'accion=Detalles&amp;controlador=Semaforo"><i class="icon-caret-right"></i>  Detalle de Incidentes</a></li>' +
            '<li><a href="' + ligaWrapper + 'accion=AccionesPreventivas&controlador=Semaforo"><i class="icon-caret-right"></i>  Acciones Operativas</a></li>' +
            '<li><a href="' + ligaWrapperEstatal + 'accion=Metodologia&amp;controlador=Semaforo"><i class="icon-caret-right"></i>  Metodología</a></li>');

            


        };


        return this.each(function () {

            var $this = $(this);



            return $this;
        });
    };
})(jQuery);