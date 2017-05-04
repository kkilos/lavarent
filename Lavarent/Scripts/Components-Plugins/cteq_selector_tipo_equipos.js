(function ($) {

    $.fn.cteq_selector_tipo_equipo = function (opciones) {

        var configuracionDefacto = {
            id_tipo_equipo: -1,
            fnOnChange: function (id_tipo_equipo, tipo_equipo) {
                

            }
        };

        var opciones = $.extend(configuracionDefacto, opciones);


        var fnPrivateObtTipoEquipo = function ($this) {
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../MembresiasClientes/ObtTipoEquipo',
                success: function (oJson) {
                    $this.empty();
                    
                    $.each(oJson, function (i, value) {
                        $this.append("<option value='" + value.id_tipo_equipo + "' " + (opciones.id_tipo_equipo == value.id_tipo_equipo ? 'selected' : '') + ">" + value.tipo_equipo + "</option>");
                    });
                }
            });
        };

        this.fnReiniciar = function () {
            fnPrivateObtTipoEquipo($(this));
        };

        this.fnActIdTipoEquipo = function (id_tipo_equipo) {
            $('option:selected', this).removeAttr('selected');
            $(this).val(id_tipo_equipo);
        };


        this.fnObtIdTipoEquipo = function () {
            return $(this).val();
        };

        this.fnObtTipoEquipo = function () {
            return $('option:selected', this).text();
        };


        return this.each(function () {

            var $this = $(this);

            fnPrivateObtTipoEquipo($this);

            $('option:selected', this).removeAttr('selected');
            $(this).val(opciones.id_tipo_equipo);

            $this.on("change", function () {
                opciones.fnOnChange($this.val(), $('option:selected', this).text());
            });
            return $this;
        });
    };
})(jQuery);