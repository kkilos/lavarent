using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using OurSDK.Models;
using OurSDK.Helpers;

namespace OurSDK.Filters
{
    public class LogonAuthorize : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            bool skipAuthorization = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), inherit: true)
            || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), inherit: true);

            if (skipAuthorization)
            {
                return;
            }

            if (!string.IsNullOrEmpty(SessionVar.guidUsuario))
            {
                filterContext.HttpContext.User =
                    new CustomPrincipal(
                        new CustomIdentity(
                            SessionVar.guidUsuario));
            }

            base.OnAuthorization(filterContext);

        }
    }
}