using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;

namespace Lavarent.Controllers
{
    [Authorize]
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
        public JsonResult ObtEquipo(int id_equipo)
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
        public JsonResult ActEquipo(int id_equipo,
            int id_tipo_equipo,
            int id_capacidad,
            int id_edo_fisico,
            int id_estatus_equipo,
            string marca,
            string modelo,
            string observaciones )
        {
            JsonResult result = new JsonResult();
            var r = new
            {
                exitoso = true,
                mensajeError = ""
            };
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_act_equipo";
            oDB.AddParameter("_id_equipo", id_equipo);
            oDB.AddParameter("_id_tipo_equipo", id_tipo_equipo);
            oDB.AddParameter("_id_capacidad", id_capacidad);
            oDB.AddParameter("_id_edo_fisico", id_edo_fisico);
            oDB.AddParameter("_id_estatus_equipo", id_estatus_equipo);
            oDB.AddParameter("_marca", marca);
            oDB.AddParameter("_modelo", modelo);
            oDB.AddParameter("_observaciones", observaciones);
            oDB.ExecuteProcedureNonQuery();
            result = Json(r);
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
        [HttpPost]
        public JsonResult ObtCatEdoFisico()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_cat_edo_fisico";
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtCatEstatus()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_cat_estatus_equipos";
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        public JsonResult ObtHistorialRentasEquipos(string id_equipo)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_historial_rentas";
            oDB.AddParameter("_id_equipo", id_equipo);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }
    }
}