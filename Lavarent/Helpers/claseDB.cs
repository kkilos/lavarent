using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Xml;
using System.IO;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Web;
using System.Web.Mvc;


namespace OurSDK.Helpers
{
    /// <summary>
    /// Clase de manejo de consultas a MYSQL por procedimientos almacenados
    /// Version 1.0 22/02/11
    /// Version 1.1 17/05/11
    /// Version 2.0 10/05/12
    /// Version 2.1 13/05/12
    /// Version 3.0 23/01/13
    /// </summary>
    public class claseDB : IDisposable
    {
        private bool disposed = false;

        private string _connectionString = string.Empty;
        private string _connectionStringDefault = Lavarent.Properties.Settings.Default.Conn; //ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
        private string _procedureName = string.Empty;
        private List<MySqlParameter> _parametersArray;
        private ArrayList _dataListArray;
        private int _bulkLoaderNumberOfLinesToSkip = 1;
        private MySqlBulkLoaderConflictOption _bulkLoaderConflictOption = MySqlBulkLoaderConflictOption.Ignore;

        /// <summary>
        /// SET y GET que especifica la cadena de conexion con la base de datos, 
        /// por default utiliza la cadena de conexion "conn" del web.config
        /// en caso de querer cambiar el esquema de la base de datos utiliza este propiedad
        /// </summary>
        public string ConnectionString
        {
            get
            {
                if (_connectionString == string.Empty)
                {
                    return _connectionStringDefault;
                }
                return _connectionString;
            }
            set { _connectionString = value; }
        }

        /// <summary>
        /// SET y GET del  
        /// </summary>
        public string Procedure
        {
            get { return _procedureName; }
            set
            {
                if (_parametersArray == null)
                {
                    _parametersArray = new List<MySqlParameter>();
                }
                else
                {
                    _parametersArray.Clear();
                }
                _procedureName = value;
            }
        }


        public ArrayList DataListArray
        {
            get { return _dataListArray; }
        }

        /// <summary>
        /// Propiedad que usa BulkLoaderExecute para definir
        /// el numero de renglones del archivo separado por comas a ignorar
        /// </summary>
        public int BulkLoaderNumberOfLinesToSkip
        {
            get { return _bulkLoaderNumberOfLinesToSkip; }
            set { _bulkLoaderNumberOfLinesToSkip = value; }
        }

        /// <summary>
        /// Propiedad que usa BulkLoaderExecute para definir 
        /// que hacer en caso de que exista un llave primaria repetida
        /// </summary>
        public MySqlBulkLoaderConflictOption BulkLoaderConflictOption
        {
            get { return _bulkLoaderConflictOption; }
            set { _bulkLoaderConflictOption = value; }
        }


        public claseDB()
        {
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (_parametersArray != null) _parametersArray.Clear();
                if (_dataListArray != null) _dataListArray.Clear();
                _parametersArray = null;
                _dataListArray = null;
                _connectionString = null;
                _connectionStringDefault = null;
                _procedureName = null;
            }
            disposed = true;
        }

        ~claseDB()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void ClearDataListArray()
        {
            _dataListArray = new ArrayList();
            _dataListArray.Clear();
        }

        public void AddDataListArray(List<Dictionary<string, object>> DataList, string DataListName)
        {
            var o = new
            {
                DataName = DataListName,
                Data = DataList
            };
            _dataListArray.Add(o);
        }

        public object GetDataListArray()
        {
            return _dataListArray;
        }

        public void AddParameter(string name, object value)
        {
            MySqlParameter parameterTmp = new MySqlParameter();
            parameterTmp.ParameterName = name;
            parameterTmp.Value = value;
            parameterTmp.Direction = ParameterDirection.Input;
            _parametersArray.Add(parameterTmp);
        }

        public void AddParameter(string name, object value, DbType DBFieldType)
        {
            MySqlParameter parameterTmp = new MySqlParameter();
            parameterTmp.ParameterName = name;
            parameterTmp.Value = value;
            parameterTmp.Direction = ParameterDirection.Input;
            parameterTmp.DbType = DBFieldType;
            _parametersArray.Add(parameterTmp);
        }

        public void AddParameter(string name, object value, System.Data.ParameterDirection direction)
        {
            MySqlParameter parameterTmp = new MySqlParameter();
            parameterTmp.ParameterName = name;
            parameterTmp.Direction = direction;
            if (parameterTmp.Direction == ParameterDirection.Input | parameterTmp.Direction == ParameterDirection.InputOutput)
            {
                parameterTmp.Value = value;
            }
            _parametersArray.Add(parameterTmp);
        }

        public void AddParameter(string name, object value, System.Data.ParameterDirection direction, DbType DBFieldType)
        {
            MySqlParameter parameterTmp = new MySqlParameter();
            parameterTmp.ParameterName = name;
            parameterTmp.Direction = direction;
            parameterTmp.DbType = DBFieldType;
            if (parameterTmp.Direction == ParameterDirection.Input | parameterTmp.Direction == ParameterDirection.InputOutput)
            {
                parameterTmp.Value = value;
            }
            _parametersArray.Add(parameterTmp);
        }

        public object GetParameter(string name)
        {
            foreach (MySqlParameter p in _parametersArray)
            {
                if (p.ParameterName == name)
                {
                    if (!(p.Value is DBNull))
                    {
                        return p.Value;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public void ClearParameters()
        {
            _parametersArray.Clear();
        }

        public void ExecuteProcedureNonQuery()
        {
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            MySqlCommand cmd = new MySqlCommand(_procedureName, conn);
            cmd.CommandTimeout = 600;
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            if ((_parametersArray != null))
            {
                foreach (MySqlParameter p in _parametersArray)
                {
                    cmd.Parameters.Add(p);
                }
                _parametersArray.Clear();
            }
            conn.Open();
            cmd.ExecuteNonQuery();
            if ((cmd.Parameters != null))
            {
                foreach (MySqlParameter p in cmd.Parameters)
                {
                    if (p.Direction == ParameterDirection.InputOutput | p.Direction == ParameterDirection.Output | p.Direction == ParameterDirection.ReturnValue)
                    {
                        _parametersArray.Add(p);
                    }
                }
            }
            conn.Close();
            conn.Dispose();
        }

        public DataRow ExecuteProcedureDataRow()
        {
            DataTable r = ExecuteProcedureDataTable("tmp");
            if (!(r.Rows.Count == 0))
            {
                return r.Rows[0];
            }
            else
            {
                return null;
            }
        }

        public DataTable ExecuteProcedureDataTable()
        {
            return ExecuteProcedureDataTable("tmp");
        }

        public DataTable ExecuteProcedureDataTable(string tableName)
        {
            return ExecuteProcedureDataSet(tableName).Tables[tableName];
        }

        public DataSet ExecuteProcedureDataSet()
        {
            return ExecuteProcedureDataSet("tmp");
        }

        public List<Dictionary<string, object>> ExecuteProcedureDataList()
        {
            return GetDataList(ExecuteProcedureDataTable("tmp"));
        }

        /// <summary>
        /// Metodo que convierte un datatable a una Lista de Key-Values
        /// </summary>
        /// <param name="dt">datatable que deseas convertir</param>
        /// <returns>Lista de Key-Values</returns>
        private List<Dictionary<string, object>> GetDataList(DataTable dt)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row = null;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col].ToString());
                }
                rows.Add(row);
            }
            return rows;
        }

        public DataSet ExecuteProcedureDataSet(string tableName)
        {
            DataSet dtTmp = new DataSet();
            MySqlDataAdapter dataAdpt = new MySqlDataAdapter();
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            MySqlCommand cmd = new MySqlCommand(_procedureName, conn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            if ((_parametersArray != null))
            {
                foreach (MySqlParameter p in _parametersArray)
                {
                    cmd.Parameters.Add(p);
                }
                _parametersArray.Clear();
            }
            conn.Open();
            dataAdpt.SelectCommand = cmd;
            dataAdpt.Fill(dtTmp, tableName);
            if ((cmd.Parameters != null))
            {
                foreach (MySqlParameter p in cmd.Parameters)
                {
                    if (p.Direction == ParameterDirection.InputOutput | p.Direction == ParameterDirection.Output | p.Direction == ParameterDirection.ReturnValue)
                    {
                        _parametersArray.Add(p);
                    }
                }
            }
            conn.Close();
            conn.Dispose();
            return dtTmp;
        }            
      
        /// <summary>
        /// Metodo para asistir la funcionalidad de ajax con el plugin de JQuery Datatables.net
        /// </summary>
        /// <param name="context">es utilizado para recuperar el request con parametros que envia o solicita el plugin de JQuery Datatables.net</param>
        /// <returns> un objeto con el formato y parametros que espera el plugin de JQuery Datatables.net, para que despues ese objeto se transforme en un JSON</returns>
        public object ExecuteDataTablesAjax(HttpRequestBase Request)
        {

            int _iTotalRecords = 0;
            int _iTotalDisplayRecords = 0;

            DataTable dt = ExecuteProcedureDataTable();

            _iTotalRecords = dt.Rows.Count;
            _iTotalDisplayRecords = dt.Rows.Count;

            var o = new
            {
                sEcho = Request["sEcho"],
                iTotalRecords = _iTotalRecords,
                iTotalDisplayRecords = _iTotalDisplayRecords,
                aaData = new List<List<string>>()
            };

            List<string> row = null;
            foreach (DataRow dr in dt.Rows)
            {
                row = new List<string>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(dr[col].ToString());
                }
                o.aaData.Add(row);
            }

            return o;
        }


        /// <summary>
        /// Metodo para asistir la funcionalidad de paginación con el plugin de JQuery Datatables.net
        /// </summary>
        /// <param name="context">es utilizado para recuperar el request con parametros que envia o solicita el plugin de JQuery Datatables.net</param>
        /// <returns>JSON con el formato y parametros que espera el plugin de JQuery Datatables.net</returns>
        public object ExecuteDataTablesPaging(HttpRequestBase Request)
        {
            int _iDisplayStart = 0;
            int _iDisplayLength = 0;
            string _sEcho = string.Empty;
            int _iTotalRecords = 0;
            int _iTotalDisplayRecords = 0;

            int _iSortingCols = 0;
            string _iSortingCol_delim = string.Empty;
            string _sSortingDir_delim = string.Empty;
            int _iSortCol_tmp = 0;

            int _iColumns = 0;
            string _sSearch = string.Empty;
            string _iSearchableCol_delim = string.Empty;

            if (Request["iDisplayStart"] == null) return string.Empty; else _iDisplayStart = Convert.ToInt32(Request["iDisplayStart"]);
            if (Request["iDisplayLength"] == null) return string.Empty; else _iDisplayLength = Convert.ToInt32(Request["iDisplayLength"]);
            if (Request["sEcho"] == null) return string.Empty; else _sEcho = Convert.ToString(Request["sEcho"]);

            AddParameter("_iDisplayStart", _iDisplayStart, DbType.Int32);
            AddParameter("_iDisplayLength", _iDisplayLength, DbType.Int32);
            AddParameter("_iTotalRecords", 0, ParameterDirection.Output, DbType.Int32);
            AddParameter("_iTotalDisplayRecords", 0, ParameterDirection.Output, DbType.Int32);

            if (Request["iSortingCols"] != null)
            {
                _iSortingCols = Convert.ToInt32(Request["iSortingCols"]);
                for (int i = 0; i < _iSortingCols; i++)
                {

                    if (Request["iSortCol_" + i] != null && Request["sSortDir_" + i] != null)
                    {
                        _iSortCol_tmp = Convert.ToInt32(Request["iSortCol_" + i]) ;
                        if (Request["bSortable_" + _iSortCol_tmp] != null)
                        {
                            if (Convert.ToBoolean(Request["bSortable_" + _iSortCol_tmp]))
                            {
                                _iSortCol_tmp += 1; 
                                _iSortingCol_delim = string.Concat(_iSortingCol_delim, (_iSortingCol_delim.Length == 0 ? Convert.ToString(_iSortCol_tmp) : string.Concat("-", Convert.ToString(_iSortCol_tmp))));
                                _sSortingDir_delim += _sSortingDir_delim.Length == 0 ? Convert.ToString(Request["sSortDir_" + i]) : "-" + Convert.ToString(Request["sSortDir_" + i]);
                            }
                        }
                    }
                }
            }

            AddParameter("_sSortingCol_delim", _iSortingCol_delim, DbType.String);
            AddParameter("_sSortingDir_delim", _sSortingDir_delim, DbType.String);
            AddParameter("_iSortingCols", _iSortingCols, DbType.Int32);

            if (Request["sSearch"] != null)
            {
                _sSearch = Convert.ToString(Request["sSearch"]);
                if (Request["iColumns"] != null)
                {
                    _iColumns = Convert.ToInt32(Request["iColumns"]);
                    for (int i = 0; i < _iColumns; i++)
                    {
                        _iSearchableCol_delim += _iSearchableCol_delim.Length == 0 ? Convert.ToString(i + 1) : "-" + Convert.ToString(i + 1);
                    }
                }
            }

            AddParameter("_sSearch", _sSearch, DbType.String);
            AddParameter("_sSearchableCol_delim", _iSearchableCol_delim, DbType.String);
            AddParameter("_iSearchableCols", _iColumns, DbType.Int32);

            DataTable dt = ExecuteProcedureDataTable();

            _sEcho = Convert.ToString(Request["sEcho"]);
            _iTotalRecords = Convert.ToInt32(GetParameter("_iTotalRecords"));
            _iTotalDisplayRecords = Convert.ToInt32(GetParameter("_iTotalDisplayRecords"));

            var o = new
            {
                sEcho = _sEcho,
                iTotalRecords = _iTotalRecords,
                iTotalDisplayRecords = _iTotalDisplayRecords,
                aaData = new List<List<string>>()
            };

            List<string> row = null;
            foreach (DataRow dr in dt.Rows)
            {
                row = new List<string>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(dr[col].ToString());
                }
                o.aaData.Add(row);
            }

            return o;
        }

        public object ExecuteDataTablesClear(HttpContext context)
        {
            string _sEcho = string.Empty;
            int _iTotalRecords = 0;
            int _iTotalDisplayRecords = 0;

            if (context.Request["sEcho"] == null) return string.Empty; else _sEcho = Convert.ToString(context.Request["sEcho"]);

            var o = new
            {
                sEcho = _sEcho,
                iTotalRecords = _iTotalRecords,
                iTotalDisplayRecords = _iTotalDisplayRecords,
                aaData = new List<List<string>>()
            };

            return o;
        }

        /// <summary>
        /// Metodo que a partir de un archivo separado por comas, carga datos a una tabla de una base de datos
        /// </summary>
        /// <param name="filePath">ruta del archivo que deseas subir</param>
        /// <param name="tableName">tabla destino</param>
        /// <returns>número de registros insertados ó en su caso que error ocurrio</returns>
        public string ExecuteBulkLoader(string filePath, string tableName)
        {

            // MySQL BulkLoader
            MySqlConnection conn = new MySqlConnection(ConnectionString);
            MySqlBulkLoader bl = new MySqlBulkLoader(conn);
            bl.TableName = tableName;
            bl.FieldTerminator = ",";
            bl.FieldQuotationCharacter = '\"';

            bl.LineTerminator = "\r\n";
            bl.CharacterSet = "utf8";
            bl.NumberOfLinesToSkip = BulkLoaderNumberOfLinesToSkip;
            bl.ConflictOption = BulkLoaderConflictOption;
            bl.FileName = filePath;
            try
            {
                conn.Open();
                int count = bl.Load();
                return count.ToString();
            }
            catch (Exception ex)
            {
                return ("Error: " + ex.ToString());
            }

        }


        private void LogError(string messageError)
        {
            //'hay que mejorar esta parte
            DataSet dsLogError = new DataSet("Logs");
            DataTable dtLogError = new DataTable("LogErrors");
            DataRow drLogError = null;
            dtLogError.Columns.Add(new DataColumn("datetime", typeof(DateTime)));
            dtLogError.Columns.Add(new DataColumn("message", typeof(string)));
            drLogError = dtLogError.NewRow();
            drLogError["datetime"] = DateTime.Now;
            drLogError["message"] = messageError;
            dtLogError.Rows.Add(drLogError);
            dsLogError.Tables.Add(dtLogError);
            dsLogError.WriteXml(HttpContext.Current.Server.MapPath(string.Concat("~/App_Data/bitacoraErroresMySQL.xml")));
        }

    }
}