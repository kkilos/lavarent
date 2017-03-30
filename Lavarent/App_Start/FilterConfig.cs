using System.Web;
using System.Web.Mvc;
using OurSDK.Filters;

namespace Lavarent
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            
            filters.Add(new LogonAuthorize());
            filters.Add(new HandleErrorAttribute());
        }
    }
}
