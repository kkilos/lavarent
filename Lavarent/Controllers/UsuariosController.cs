using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurSDK.Helpers;

namespace Lavarent.Controllers
{
    [Authorize]
    public class UsuariosController : Controller
    {
        // Vista de Usuarios
        public ActionResult MantenimientoUsuarios()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObtUsuarios()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "usrs_t_pag_usuarios";

            result = Json(oDB.ExecuteDataTablesPaging(Request), JsonRequestBehavior.AllowGet);
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ObtUsuario(string guid_usuario)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "usrs_p_obt_usuario";
            oDB.AddParameter("_guid_usuario", guid_usuario);
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }
        [HttpPost]
        public JsonResult ObtRoles()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "usrs_p_obt_roles";
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;
        }


        [HttpPost]
        public JsonResult ActUsuario(
            string guid_usuario,
            string nombre,
            string contrasenia,
            int id_rol,
            string comentario)
        {

            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            claseValida oVal = new claseValida();
            var r = new
            {
                exitoso = true,
                mensajeError = ""
            };


            oDB.Procedure = "usrs_p_act_usuario";
            oDB.AddParameter("_guid_usuario", guid_usuario);
            oDB.AddParameter("_nombre", oVal.EntradaTexto(nombre));
            oDB.AddParameter("_contrasenia", contrasenia);
            oDB.AddParameter("_id_rol", id_rol);
            oDB.AddParameter("_comentario", oVal.EntradaTexto(comentario));
            oDB.ExecuteProcedureNonQuery();
            result = Json(r);
            oDB.Dispose();
            return result;
        }

        [HttpPost]
        public JsonResult ActUsuarioActivarDesactivar(string guid_usuario)
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            claseValida oVal = new claseValida();
            var r = new
            {
                exitoso = true,
                mensajeError = ""
            };

            oDB.Procedure = "usrs_p_act_usuario_activar_desactivar";
            oDB.AddParameter("_guid_usuario", guid_usuario);
            oDB.ExecuteProcedureNonQuery();
            result = Json(r);
            oDB.Dispose();
            return result;
        }


        [HttpPost]
        public JsonResult ObtMenu()
        {
            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            oDB.Procedure = "usrs_p_obt_menu";
            oDB.AddParameter("_guid_usuario", User.Identity.Name.ToString());
            result = Json(oDB.ExecuteProcedureDataList());
            oDB.Dispose();
            return result;

        }

        [HttpPost]
        public JsonResult NuevoUsuario(
            string nombre,
            string usuario,
            string contrasenia,
            int id_rol,
            string comentario)
        {

            JsonResult result = new JsonResult();
            claseDB oDB = new claseDB();
            claseValida oVal = new claseValida();
            System.Data.DataRow InfoOperacion;
            Boolean agregado = false;


            oDB.Procedure = "usrs_p_act_usuario_nuevo";
            oDB.AddParameter("_nombre", oVal.EntradaTexto(nombre));
            oDB.AddParameter("_usuario", usuario);
            oDB.AddParameter("_contrasenia", contrasenia);
            oDB.AddParameter("_id_rol", id_rol);
            oDB.AddParameter("_comentario", oVal.EntradaTexto(comentario));
            oDB.AddParameter("_guid_usuario_nuevo", User.Identity.Name);
            InfoOperacion = oDB.ExecuteProcedureDataRow();


            if (!(InfoOperacion == null))
            {
                agregado = Convert.ToBoolean(InfoOperacion["agregado"]);
            }

            var r = new
            {
                exitoso = agregado,
                mensajeError = (!agregado ? "ocurrio un error: el usuario ya existe" : "")
            };
            result = Json(r);
            oDB.Dispose();
            return result;
        }
    }
}