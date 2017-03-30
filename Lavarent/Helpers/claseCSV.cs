using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.Text;

namespace OurSDK.Helpers
{
    public class claseCSV
    {
        private DataSet _csvDataSet;
        private string _csvToExport;
        int cont = 0;
        public DataSet CsvDataSet
        {
            get { return _csvDataSet; }
            set { _csvDataSet = value; }
        }

        public string CsvToExport
        {
            get { return _csvToExport; }
            set { _csvToExport = value; }
        }
        public bool CsvToFile(string filename)
        {
            StreamWriter sr = null;
            try
            {
                sr = new StreamWriter(filename, false, Encoding.UTF8);
                sr.WriteLine(CsvToExport.ToString());
                sr.Close();
                return true;
            }
            catch
            {
                sr.Close();
                return false;
            }
            finally
            {
                if (sr != null)
                {
                    sr.Close();
                }

            }

        }
        public void CreateCsvFromDataSet(DataTable dt)
        {
            try
            {
                cont++;
                //Define the stringbuilder to export data
                StringBuilder dataToExport = new StringBuilder();
                //Select the first datatable from dataset and 
                //loops through its columns then add each column name 
                //header string seperated by (,)
                foreach (DataTable dtExport in dt.DataSet.Tables)
                {
                    //To store the header from datatable
                    StringBuilder headerToExport = new StringBuilder();
                    //Loops through the columns
                    string camposDatatimes = "";
                    int Contadorcolumnas = 0;
                    foreach (DataColumn dCol in dtExport.Columns)
                    {
                        Contadorcolumnas++;
                        Type tipo = dCol.DataType;
                        if (tipo.Name.ToString() == "DateTime")
                        {
                            camposDatatimes += Contadorcolumnas.ToString() + "|";
                        }
                        //Append Character (") before columnname
                        headerToExport.Append((char)34);
                        //Append columnname
                        switch (dCol.ColumnName)
                        {
                            case "default":
                                headerToExport.Append("default");
                                break;
                            default:
                                headerToExport.Append(dCol.ColumnName);
                                break;
                        }
                        //Append Character (") 
                        headerToExport.Append((char)34);
                        //Append Character (')
                        headerToExport.Append((char)44);
                    }
                    //Remove the last coma from header string
                    headerToExport.Remove(headerToExport.Length - 1, 1);
                    //Append blank rows
                    headerToExport.Append(Environment.NewLine);

                    //Add to CsvString 
                    dataToExport.Append(headerToExport.ToString());
                    //To store the row values from datatable
                    StringBuilder bodyToExport = new StringBuilder();
                    //Loops through each row
                    int cantrows = dtExport.Rows.Count;
                    int incrementorows = 0;
                    foreach (DataRow dRow in dtExport.Rows)
                    {
                        incrementorows++;
                        //Gets the all values from current row
                        object[] tempArray = dRow.ItemArray;
                        //Loops through itemArray values     
                        int numeroCampo = 0;
                        string dato = "";
                        bool esdatetime = false;

                        string campos = camposDatatimes.ToString();
                        int cant = campos.IndexOf('|');
                        char[] delimit = new char[] { '|' };
                        string[] ArrayDatetime = campos.Split(delimit);
                        foreach (object curRow in tempArray)
                        {
                            esdatetime = false;
                            numeroCampo++;
                            dato = curRow.ToString();
                            //Append the current row value
                            dato = dato.Replace((char)34, (char)39);
                            dato = dato.Replace((char)44, (char)32);
                            dato = dato.Replace(',', ' ');
                            bodyToExport.Append((char)34);
                            if (dato.ToString() == "")
                            {
                                bodyToExport.Append("\\N");
                            }
                            else if (camposDatatimes.ToString().IndexOf('|') == 1)
                            {

                                foreach (string s in ArrayDatetime)
                                {
                                    if (numeroCampo.ToString() == s.ToString())
                                        esdatetime = true;
                                }
                                try
                                {
                                    if (esdatetime)
                                    {
                                        string origi = curRow.ToString();
                                        string[] parte = origi.Split(' ');
                                        string[] date = parte[0].Split('/');
                                        string fecha = date[2] + '/' + date[1] + '/' + date[0] + ' ' + parte[1].ToString();
                                        bodyToExport.Append(fecha.ToString());
                                    }
                                    else
                                    {
                                        bodyToExport.Append(dato.ToString());
                                    }
                                }
                                catch (Exception ex)
                                {
                                    string fecha2 = "\\N";
                                    bodyToExport.Append(fecha2.ToString());
                                }
                            }
                            else
                                bodyToExport.Append(dato.ToString());
                            //bodyToExport.Append(curRow.ToString().Replace((char)34,' '));
                            bodyToExport.Append((char)34);
                            //Append character(,)
                            bodyToExport.Append((char)44);
                        }
                        //Remove the last coma from header string
                        bodyToExport.Remove(bodyToExport.Length - 1, 1);
                        //Append blank rows
                        if (cantrows == incrementorows)
                            continue;
                        else
                            bodyToExport.Append(Environment.NewLine);
                    }
                    //Append the data
                    dataToExport.Append(bodyToExport.ToString());
                    //Append blank rows at the end of current table data
                }
                //Set the value
                CsvToExport = dataToExport.ToString();
            }
            catch (Exception ex)
            {
                CsvToExport = string.Empty;
            }
        }
    }
}