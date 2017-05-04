$(document).ready(function () {   
   var fechaHoy = moment().format('YYYY-MM-DD');    
   var seleccion_dias = $('#seleccion_dias').week_timeline({
       fecha_seleccionada: fechaHoy,
       idSeleccionDia: "DatePickerSeleccionDias",
        fnOnChange: function (fecha) {
            $("#ToDoRentas").todo_rentas({ "fechaSeleccionada": fecha });
        }
   });

    App.init();
});