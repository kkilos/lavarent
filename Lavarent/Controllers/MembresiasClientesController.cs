using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;
using System.Drawing;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Data;

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
            int identificacion_id_estatus_imagen,
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
            oDB.AddParameter("_identificacion_id_estatus_imagen", identificacion_id_estatus_imagen);
            oDB.AddParameter("_observaciones", observaciones);
            oDB.ExecuteProcedureNonQuery();
            result = Json(r);
            oDB.Dispose();
            return result;
        }
        [HttpPost]
        public async Task<JsonResult> ActClienteIdentificacion(string id_cliente, int identificacion_id_estatus_imagen)
        {
            try
            {
                foreach (string file in Request.Files)
            {
                HttpPostedFileBase hpf = Request.Files[file] as HttpPostedFileBase;
                    if (hpf.ContentLength == 0)
                        continue;
                    int fileSizeInBytes = hpf.ContentLength;
                    MemoryStream target = new MemoryStream( );
                    hpf.InputStream.CopyTo(target);
                    byte[] dataImagen = target.ToArray();
                    claseDB oDB = new claseDB();
                    oDB.Procedure = "mbrs_p_act_cliente_identificacion";
                    oDB.AddParameter("_id_cliente", id_cliente);
                    oDB.AddParameter("_identificacion_content_type", hpf.ContentType.ToString());
                    oDB.AddParameter("_identificacion_id_estatus_imagen", identificacion_id_estatus_imagen);  
                    oDB.AddParameter("_identificacion_imagen", dataImagen);
                    oDB.ExecuteProcedureNonQuery();
                    oDB.Dispose();
            }

            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Upload failed");
            }
            return Json("File uploaded successfully");
        }

        [HttpGet]
        public FileResult ObtClienteIdentificacion(string id_cliente)
        {

            DataRow row;
            byte[] dataImagen = null;
            string ContentType = string.Empty;
            claseDB oDB = new claseDB();
            oDB.Procedure = "mrbs_p_obt_cliente_identificacion";
            oDB.AddParameter("_id_cliente", id_cliente);
            row = oDB.ExecuteProcedureDataRow();
            oDB.Dispose();
            if(!DBNull.Value.Equals(row["identificacion_imagen"]))
            {
                ContentType = row["identificacion_content_type"].ToString();
                dataImagen = (byte[]) row["identificacion_imagen"];
            }
            else
            {
                return File(Server.MapPath("~") + "\\Content\\img\\imagen-no-disponible.jpg", "image/jpg");
            } 
            return File(dataImagen, ContentType);
        }


        [HttpPost]
        public async Task<JsonResult> ActClienteComprobante(string id_cliente, int comprobante_id_estatus_imagen)
        {
            try
            {
                foreach (string file in Request.Files)
                {
                    HttpPostedFileBase hpf = Request.Files[file] as HttpPostedFileBase;
                    if (hpf.ContentLength == 0)
                        continue;
                    int fileSizeInBytes = hpf.ContentLength;
                    MemoryStream target = new MemoryStream();
                    hpf.InputStream.CopyTo(target);
                    byte[] dataImagen = target.ToArray();
                    claseDB oDB = new claseDB();
                    oDB.Procedure = "mbrs_p_act_cliente_comprobante";
                    oDB.AddParameter("_id_cliente", id_cliente);
                    oDB.AddParameter("_comprobante_content_type", hpf.ContentType.ToString());
                    oDB.AddParameter("_comprobante_id_estatus_imagen", comprobante_id_estatus_imagen);
                    oDB.AddParameter("_comprobante_imagen", dataImagen);
                    oDB.ExecuteProcedureNonQuery();
                    oDB.Dispose();
                }

            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Upload failed");
            }
            return Json("File uploaded successfully");
        }

        [HttpGet]
        public FileResult ObtClienteComprobante(string id_cliente)
        {

            DataRow row;
            byte[] dataImagen = null;
            string ContentType = string.Empty;
            claseDB oDB = new claseDB();
            oDB.Procedure = "mrbs_p_obt_cliente_comprobante";
            oDB.AddParameter("_id_cliente", id_cliente);
            row = oDB.ExecuteProcedureDataRow();
            oDB.Dispose();
            if (!DBNull.Value.Equals(row["comprobante_imagen"]))
            {
                ContentType = row["comprobante_content_type"].ToString();
                dataImagen = (byte[])row["comprobante_imagen"];
            }
            else
            {
                return File(Server.MapPath("~") + "\\Content\\img\\imagen-no-disponible.jpg", "image/jpg");
            }
            return File(dataImagen, ContentType);
        }


        [HttpPost]
        public JsonResult ObtTipoEquipo()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "cteq_p_obt_cat_tipos_equipos";
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }

    }
}