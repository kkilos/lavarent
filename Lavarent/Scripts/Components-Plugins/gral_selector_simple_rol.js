(function ($) {

    $.fn.gral_selector_simple_rol = function (opciones) {

        var configuracionDefacto = {
            id_rol: -1,
            fnOnChange: function (id_rol, rol) { }
        };

        var opciones = $.extend(configuracionDefacto, opciones);


        var fnPrivateObtenerRoles = function ($this) {
            $.ajax({
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                async: false,
                url: '../Usuarios/ObtRoles',
                success: function (oJson) {
                    $this.empty();
                    $.each(oJson, function (i, value) {
                        $this.append("<option value='" + value.id_rol + "' " + (opciones.id_rol == value.id_rol ? 'selected' : '') + ">" + value.rol + "</option>");
                    });
                }
            });
        };

        this.fnReiniciar = function () {
            fnPrivateObtenerRoles($(this));
        };

        this.fnActRol = function (id_rol) {
            $('option:selected', this).removeAttr('selected');
            $(this).val(id_rol);
        };


        this.fnObtRol = function () {
            console.log($(this).val());
            return $(this).val();
        };

        this.fnObtRolNombre = function () {
            return $('option:selected', this).text();
        };


        return this.each(function () {

            var $this = $(this);

            fnPrivateObtenerRoles($this);

            $('option:selected', this).removeAttr('selected');
            $(this).val(opciones.id_rol);

            $this.on("change", function () {
                opciones.fnOnChange($this.val(), $('option:selected',this).text());
            });
            return $this;
        });
    };
})(jQuery);