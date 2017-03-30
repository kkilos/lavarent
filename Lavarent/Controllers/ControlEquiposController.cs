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
    }
}