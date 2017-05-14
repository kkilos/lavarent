(function ($) {

    $.fn.gral_menu_accesos = function (opciones) {

        var configuracionDefacto = {
            
        };

        var opciones = $.extend(configuracionDefacto, opciones);


        var fnPrivateRedendeaMenu = function ($this) {

            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../Usuarios/ObtMenu',
                success: function (oJson) {
                    //$this.empty();
                    $.each(oJson, function (i, value) {
                        console.log(value);
                        $this.append('<li class="nav-item"><a href="/' + value.controlador + '/' + value.accion + '" class="nav-link "><i class="' + value.icono + '"></i><span class="title">' + value.texto + '</span></a></li>');
                    });
                }
            });
            
            
        };


        return this.each(function () {

            var $this = $(this);

            fnPrivateRedendeaMenu($this);

            return $this;
        });
    };
})(jQuery);