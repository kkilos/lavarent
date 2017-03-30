using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace OurSDK.Helpers
{
    public class claseExcel
    {
        private string _storageRepositoryPath;
        public string StorageRepositoryPath
        {
            get { return _storageRepositoryPath; }
            set { _storageRepositoryPath = value;  }
        }

        public DataTable ReadExcelToDataTable(string pathFile)    
        {
            string connstring = string.Empty;
            switch (Path.GetExtension(pathFile))
            {
                case "XLSX":
                    connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + pathFile + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";
                    break;
                case "XLS":
                    connstring = "Provider=Microsoft.JET.OLEDB.4.0;Data Source=" + pathFile + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";
                    break;
                default:
                    connstring = "Provider=Microsoft.JET.OLEDB.4.0;Data Source=" + pathFile + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";
                    break;
            }           

            using(OleDbConnection conn = new OleDbConnection(connstring))
            {
                conn.Open();
                //Get All Sheets Name
                DataTable sheetsName = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables,new object[]{null,null,null,"Table"});  
                //Get the First Sheet Name
                string firstSheetName = sheetsName.Rows[0][2].ToString(); 
                
                //Query String 
                string sql = string.Format("SELECT * FROM [{0}]",firstSheetName); 
                OleDbDataAdapter ada =new OleDbDataAdapter(sql,connstring);
                DataSet set = new DataSet();
                ada.Fill(set);
                return set.Tables[0];   
            }
        }

        public void WriteExcelFromDataTable(DataTable dt, string filename)
        {
            if (dt.Rows.Count > 0)
            {
                StringWriter tw = new StringWriter();
                HtmlTextWriter hw = new HtmlTextWriter(tw);
                DataGrid dgGrid = new DataGrid();
                dgGrid.DataSource = dt;
                dgGrid.DataBind();
                //Get the HTML for the control.
                dgGrid.RenderControl(hw);
                //Write the HTML back to the browser.
                HttpContext context = HttpContext.Current;
                context.Response.ClearContent();
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + filename + "");
                context.Response.Write(tw.ToString());
                context.Response.End();
            }
        }

        public byte[] GetBytesExcelFromDataTable(DataTable dt, string filename)
        {
                StringBuilder sb = new StringBuilder();
                System.Text.Encoding iso_8859_1 = System.Text.Encoding.GetEncoding("iso-8859-1");
                sb.Append("<workbook><table border='" + "2px" + "'b>");
                //write column headings
                sb.Append("<tr>");
                foreach (System.Data.DataColumn dc in dt.Columns)
                {
                    sb.Append("<td><b><font face=Arial size=2>" + dc.ColumnName + "</font></b></td>");
                }
                sb.Append("</tr>");

                //write table data
                foreach (System.Data.DataRow dr in dt.Rows)
                {
                    sb.Append("<tr>");
                    foreach (System.Data.DataColumn dc in dt.Columns)
                    {
                        sb.Append("<td><font face=Arial size=" + "14px" + ">" + dr[dc].ToString() + "</font></td>");
                    }
                    sb.Append("</tr>");
                }
                sb.Append("</table></workbook>");


                HttpContext context = HttpContext.Current;
                context.Response.ClearContent();
                context.Response.ContentType = "application/vnd.ms-excel";
                context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + filename + "");
                
                byte[] buffer = iso_8859_1.GetBytes(sb.ToString());
                return buffer;

        }





    }
}