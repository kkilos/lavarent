using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Security;
using System.Web.Mvc;
using OurSDK.Models;
using OurSDK.Helpers;

namespace Lavarent.Controllers
{
    public class StartController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login()
        {
            var vm = new LoginPageViewModel
            {
                Username = "",
                Password = "",
                ErrorMessage = ""
            };

            if (SessionVar.guidUsuario != null)
            {
                ClaseBitacora bitacora = new ClaseBitacora();
                bitacora.Log(ClaseBitacora.TipoAccion.FIN, "");
            }
            FormsAuthentication.SignOut();
            SessionVar.reset();
            return View(vm);
        }

        //[AllowAnonymous]
        //public ActionResult LoginRapido()
        //{
        //    var vm = new LoginPageViewModel
        //    {
        //        Username = "",
        //        Password = "",
        //        ErrorMessage = ""
        //    };

        //    if (SessionVar.guidUsuario != null)
        //    {
        //        ClaseBitacora bitacora = new ClaseBitacora();
        //        bitacora.Log(ClaseBitacora.TipoAccion.FIN, "");
        //    }
        //    FormsAuthentication.SignOut();
        //    SessionVar.reset();
        //    return View(vm);
        //}

        [HttpPost]
        [AllowAnonymous]
        [ValidateInput(true)]
        public ActionResult Login(LoginPageViewModel viewModel)
        {

            if (!ModelState.IsValid)
            {
                viewModel.ErrorMessage = "Por favor proporcione su nombre de usuario y contraseña";
                return PartialView(viewModel);
            }

            if (string.IsNullOrEmpty(viewModel.Username)
                || string.IsNullOrEmpty(viewModel.Password))
            {
                viewModel.ErrorMessage = "Por favor proporcione su nombre de usuario y contraseña";
                return PartialView(viewModel);
            }

            claseValida Valida = new claseValida();
            claseDB oDB = new claseDB();
            DataRow InfoSesion;
            oDB.Procedure = "usrs_p_obt_autentificacion";
            oDB.AddParameter("_usuario", Valida.EntradaTexto(viewModel.Username));
            oDB.AddParameter("_contrasenia", Valida.EntradaTexto(viewModel.Password));
            InfoSesion = oDB.ExecuteProcedureDataRow();
            oDB.Dispose();

            if (!(InfoSesion == null))
            {
                SessionVar.Username = viewModel.Username;
                SessionVar.guidUsuario = Valida.SalidaTexto(InfoSesion["guid_usuario"]);
                FormsAuthentication.SetAuthCookie(Valida.SalidaTexto(InfoSesion["guid_usuario"]), false);

                ClaseBitacora bitacora = new ClaseBitacora();
                bitacora.Log(ClaseBitacora.TipoAccion.INI, "");
                return RedirectToAction("MembresiasClientes", "MembresiasClientes");
            }

            viewModel.ErrorMessage = "Login o contraseña incorrecta";
            return PartialView(viewModel);

        }
    }
}