using System;
using System.Web;
using OurSDK.Models;

namespace OurSDK.Helpers
{
    public class ClaseBitacora
    {
        public enum TipoAccion
        {
            INI = 1,
            LEC = 2,
            CAP = 3,
            IMP = 4,
            BOR = 6,
            FIN = 7
        }

        public ClaseBitacora()
	    {
        }
        /// <summary>
        /// Dar seguimiento a las acciones importantes que realiza el usuario
        /// </summary>
        /// <param name="_tipo_accion">Tipo de Acción, Enum {INI,LEC,CAP,BOR,FIN}</param>
        /// <param name="_ubicacion_sistema">Módulo, sección, o funcionalidad </param>
        public void Log(TipoAccion _tipo_accion, string _ubicacion_sistema)
        {
            claseDB oDB = new claseDB();
            oDB.Procedure = "gral_p_bit_actividad_usuario";
            oDB.AddParameter("_tipo_accion", _tipo_accion);
            oDB.AddParameter("_guid_usuario",HttpContext.Current.User.Identity.Name);
            oDB.AddParameter("_ubicacion_sistema", _ubicacion_sistema);
            oDB.AddParameter("_url", HttpContext.Current.Request.Url.AbsolutePath);
            oDB.AddParameter("_ip", HttpContext.Current.Request.UserHostAddress);
            oDB.ExecuteProcedureNonQuery();
            oDB.Dispose();
        }
    }
}

