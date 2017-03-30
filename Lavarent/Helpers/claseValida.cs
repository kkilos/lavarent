using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Web;
using System.Text;

/// <summary>
/// Clase para validar campos de datos desde y para una base de datos
/// Version 1.0 22/02/11
/// Version 2.0 25/04/13
/// </summary>
/// <remarks></remarks>

namespace OurSDK.Helpers
{
    public class claseValida : IDisposable
    {
        private bool disposed = false;

        
        public claseValida()
        {
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                //en caso de utilizar variables globales limpialas aquí...
            }
            disposed = true;
        }

        ~claseValida()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public string SalidaTexto(object valor)
        {
            if (valor is DBNull)
            {
                valor = string.Empty;
            }
            return Convert.ToString(valor);
        }

        public double SalidaNumerico(object valor)
        {
            if (valor is DBNull)
            {
                valor = 0;
            }
            return Convert.ToDouble(valor);
        }

        public object SalidaObjeto(object valor)
        {
            if (valor is DBNull)
            {
                valor = null;
            }
            return valor;
        }

        private string HtmlEncode(string stringField)
        {
            string stringResult = string.Empty;
            foreach (char c in stringField)
            {
                switch (c)
                {
                    case '&':
                        stringResult += "&amp;";
                        break;
                    case '\'':
                        stringResult += "&#39;";
                        break;
                    case '"':
                        stringResult += "&quot;";
                        break;
                    case '<':
                        stringResult += "&lt;";
                        break;
                    case '>':
                        stringResult += "&gt;";
                        break;
                    default:
                        stringResult += c;
                        break;
                }
            }
            return stringResult;
        }

        /// <summary>
        /// Clase para evitar inyección de código  
        /// </summary>
        /// <param name="stringField">valor del campo</param>
        /// <returns>valor del campo inicial filtrado </returns>
        /// <remarks>
        /// valida los tipos de caracteres de escape para comentarios
        /// estudiar su necesidad  
        /// </remarks>
        public string EntradaTexto(string stringField)
        {
            return HtmlEncode(stringField.Replace("'", "\"").Replace("//", string.Empty).Replace("/*", "*").Replace("--", string.Empty).Trim().ToUpper());
        }

        public string EntradaTexto(string stringField, int length)
        {
            return (stringField.Length <= length) ? EntradaTexto(stringField) : EntradaTexto(stringField).Substring(0, length);
        }

        public int EntradaNumerico(string valor)
        {
            return Convert.ToInt32(valor);
        }

        public string EntradaFecha(System.DateTime dateField)
        {
            return dateField.Day + "/" + dateField.Month + "/" + dateField.Year;
        }

        public bool esTamanioValido(string stringField, int length)
        {
            return (stringField.Length <= length);
        }

        public bool esEMail(string eMail)
        {

            if (string.IsNullOrEmpty(eMail))
            {
                return false;
            }
            return Regex.IsMatch(eMail, "^([\\w-]+\\.)*?[\\w-]+@[\\w-]+\\.([\\w-]+\\.)*?[\\w]+$");
        }

        public bool esTelefono(string nTel)
        {
            if (string.IsNullOrEmpty(nTel))
            {
                return false;
            }
            if (!(nTel.Length == 10))
            {
                return false;
            }
            return Regex.IsMatch(nTel, "^[0-9]+$");
        }

        public string limpiaMascaraTelefono(string telefono)
        {
            return telefono.Replace("(", "").Replace(")", "").Replace(" ", "").Replace("-", "");
        }
    }
}