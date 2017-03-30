using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;
using System.Drawing;

namespace Lavarent.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    public class MembresiasClientesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        // GET: MembresiasClientes
        public ActionResult MembresiasClientes()
        {
            return View();
        }

        //public ActionResult ImagenComprobante(int id)
        //{
        //    byte[] cover = GetImageFromDataBase(id);
        //    if (cover != null)
        //    {
        //        return File(cover, "image/jpg");
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
        //private bool ThumbnailCallback()
        //{
        //    return true;
        //}

        //private Image ObtVistaMiniatura(Image image)
        //{
        //    Image.GetThumbnailImageAbort callback =  new Image.GetThumbnailImageAbort(ThumbnailCallback);
        //    Image pThumbnail = image.GetThumbnailImage(100, 100, callback, new IntPtr());
        //    return pThumbnail;
        //}

        public JsonResult ObtClientes()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "mbrs_p_pag_clientes";
            result = Json(oDB.ExecuteDataTablesPaging(Request), JsonRequestBehavior.AllowGet);
            oDB.Dispose();
            return result;
        }
        [HttpPost]
        public JsonResult ObtHistorialRentas(string id_cliente)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "mbrs_p_obt_historial_rentas";
            oDB.AddParameter("_id_cliente", id_cliente);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }


        [HttpPost]
        public JsonResult ObtCliente(string id_cliente)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "mbrs_p_obt_cliente";
            oDB.AddParameter("_id_cliente", id_cliente);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtColonias(string colonia)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "mbrs_p_obt_colonias";
            oDB.AddParameter("_colonia", colonia);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtColonia(string id_colonia)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "mbrs_p_obt_colonia";
            oDB.AddParameter("_id_colonia", id_colonia);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ActCliente(
            int id_cliente, 
            string nombre_completo ,
            string direccion,
            string datos_ubicacion,
            double latitud,
            double longitud,
            int id_colonia,
            string tel_casa,
            string tel_cel,
            string referencia_1_nombre,
            string referencia_1_telefono,
            string referencia_2_nombre,
            string referencia_2_telefono,
            string observaciones)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            var r = new
            {
                exitoso = true,
                mensajeError = ""
            };
            oDB.Procedure = "mbrs_p_act_cliente";
            oDB.AddParameter("_id_cliente", id_cliente);
            oDB.AddParameter("_nombre_completo", nombre_completo);
            oDB.AddParameter("_direccion", direccion);
            oDB.AddParameter("_datos_ubicacion", datos_ubicacion);
            oDB.AddParameter("_latitud", latitud);
            oDB.AddParameter("_longitud", longitud);
            oDB.AddParameter("_id_colonia", id_colonia);
            oDB.AddParameter("_tel_casa", tel_casa);
            oDB.AddParameter("_tel_cel", tel_cel);
            oDB.AddParameter("_referencia_1_nombre", referencia_1_nombre);
            oDB.AddParameter("_referencia_1_telefono", referencia_1_telefono);
            oDB.AddParameter("_referencia_2_nombre", referencia_2_nombre);
            oDB.AddParameter("_referencia_2_telefono", referencia_2_telefono);
            oDB.AddParameter("_observaciones", observaciones);
            oDB.ExecuteProcedureNonQuery();
            result = Json(r);
            oDB.Dispose();
            return result;
        }


    }
}