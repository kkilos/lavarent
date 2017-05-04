using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;

namespace Lavarent.Controllers
{
    [AllowAnonymous]
    public class OrdenesRentasController : Controller
    {
        // GET: OrdenesRentas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OrdenesRentas()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ObtDiasSemana(DateTime fecha)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "rnts_p_obt_dias_de_la_semana";
            oDB.AddParameter("fecha", fecha);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtRentasDia(DateTime fecha)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "rnts_p_obt_rentas_del_dia";
            oDB.AddParameter("_fecha", fecha);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }


        [HttpPost]
        public JsonResult ObtEquiposDisponibles(DateTime fecha_propuesta, int numero_de_semnas_propuesta, int id_tipo_equipo)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "rnts_p_obt_numero_equipos_disponibles";
            oDB.AddParameter("_fecha_propuesta", fecha_propuesta);
            oDB.AddParameter("_numero_de_semnas_propuesta", numero_de_semnas_propuesta);
            oDB.AddParameter("_id_tipo_equipo", id_tipo_equipo);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

    }
}