using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;

namespace Lavarent.Controllers
{
    [AllowAnonymous]
    public class ControlEquiposController : Controller
    {
        // GET: ControlEquipos
        public ActionResult ControlEquipos()
        {
            return View();
        }
        public JsonResult ObtEquipos()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_pag_equipos";
            result = Json(oDB.ExecuteDataTablesPaging(Request), JsonRequestBehavior.AllowGet);
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtEquipo(string id_equipo)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_equipo";
            oDB.AddParameter("_id_equipo", id_equipo);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }


        [HttpPost]
        public JsonResult ObtCatTipoEquipos()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_cat_tipos_equipos";
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtCatCapacidad(int id_tipo_equipo)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_cat_capacidad";
            oDB.AddParameter("_id_tipo_equipo", id_tipo_equipo);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }
    }
}