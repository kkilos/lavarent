using System.Web;
using System.Web.Optimization;

namespace Lavarent
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.UseCdn = false;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                            "~/Scripts/jquery-1.12.4.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/excanvas").Include(
                        "~/Scripts/excanvas.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/respond").Include(
                        "~/Scripts/respond0.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/ie8.fix").Include(
                         "~/Scripts/Plugins/compatible-ie/ie8.fix.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/base-ui-1").Include(
                "~/Scripts/Plugins/js.cookie.min.js",
                "~/Scripts/Plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                "~/Scripts/Plugins/jquery.blockui.min.js",
                "~/Scripts/Plugins/bootstrap-switch/bootstrap-switch.min.js",
                "~/Scripts/Plugins/bootstrap-sweetalert/sweetalert.min.js",
                "~/Scripts/Plugins/bootstrap-sweetalert/ui-sweetalert.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/base-ui-2").Include(
                "~/Scripts/Metronic/app.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/base-ui-3").Include(
                "~/Scripts/Metronic/layout.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-backstretch").Include(
            "~/Scripts/jquery.backstretch.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-fileinput").Include(
            "~/Scripts/Plugins/bootstrap-fileinput/bootstrap-fileinput.js"));


            //bundles.Add(new ScriptBundle("~/bundles/dataTables").Include(
            //"~/Scripts/Plugins/datatables/datatables.min.js",
            //"~/Scripts/Plugins/datatables/datatables.bootstrap.js"

            //));
            bundles.Add(new ScriptBundle("~/bundles/dataTables").Include(
                "~/Scripts/DataTables/media/js/jquery.dataTables.min.js",
                "~/Scripts/DataTables/media/js/datatables.bootstrap.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/dataTables.buttons.min.js",
                "~/Scripts/DataTables/jszip.min.js",
                "~/Scripts/DataTables/pdfmake.min.js",
                "~/Scripts/DataTables/vfs_fonts.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.html5.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.print.min.js",
                "~/Scripts/DataTables/extensions/Scroller/js/dataTables.scroller.min.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap-modal").Include(
            "~/Scripts/Plugins/bootstrap-modal/bootstrap-modalmanager.js",
            "~/Scripts/Plugins/bootstrap-modal/bootstrap-modal.js"

            ));
            bundles.Add(new ScriptBundle("~/bundles/summernote").Include(
            "~/Scripts/Plugins/bootstrap-summernote/summernote.min.js"
            ));


            bundles.Add(new ScriptBundle("~/bundles/gmaps").Include(
            "~/Scripts/Plugins/gmaps/gmaps.min.js"));


            // "http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all",

            bundles.Add(new StyleBundle("~/Content/css-base-1").Include(
                      "~/Content/Plugins/font-awesome/css/font-awesome.css",
                      "~/Content/Plugins/simple-line-icons/css/simple-line-icons.css",
                      "~/Content/Plugins/bootstrap/css/bootstrap.css",
                      "~/Content/Pluigns/bootstrap-switch/bootstrap-switch.min.css",
                      "~/Content/Pluigns/bootstrap-sweetalert/sweetalert.css"
            ));
            bundles.Add(new StyleBundle("~/Content/css-base-2").Include(
                      "~/Content/Plugins/components.css",
                      "~/Content/Plugins/plugins.min.css"
            ));
            bundles.Add(new StyleBundle("~/Content/css-base-3").Include(
                      "~/Content/Metronic/layout/css/layout.min.css",
                      "~/Content/Metronic/layout/css/themes/grey.min.css",
                      "~/Content/Metronic/layout/css/custom.min.css"
            ));


            bundles.Add(new StyleBundle("~/Content/dataTables").Include(
                      "~/Content/Plugins/dataTables/datatables.min.css",
                      "~/Content/Plugins/dataTables/datatables.bootstrap.css"
            ));
            bundles.Add(new StyleBundle("~/Content/summernote").Include(
                "~/Content/Plugins/bootstrap-summernote/summernote.css"
            ));
            bundles.Add(new StyleBundle("~/Content/bootstrap-modal").Include(
                "~/Content/Plugins/bootstrap-modal/bootstrap-modal-bs3patch.css",
                "~/Content/Plugins/bootstrap-modal/bootstrap-modal.css"
            ));
            //bundles.Add(new StyleBundle("~/Content/Pluings/font-awesome/css/font-awesome").Include(
            //       "~/Content/Pluings/font-awesome/css/font-awesome-{version}.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap-fileinput").Include(
            "~/Content/Plugins/bootstrap-fileinput/bootstrap-fileinput.css"));

            bundles.Add(new StyleBundle("~/Content/login").Include(
                    "~/Content/Pages/css/login.css"));
        }
    }
}
