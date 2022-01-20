using API_Esercitazione.Models;
using System.Data;
using Dapper;
using Npgsql;

namespace API_Esercitazione.DAO
{
    public class FrequenzaDAO
    {
        //METODI ATTESTATO
        public static byte[]? GetAttestato(int id_c, string cod_fiscale)
        {
            //CHECK IF FREQUENZA EXIST
            var tmpFreq = FrequenzaDAO.GetSingle(id_c, cod_fiscale);
            if (!AllExist(tmpFreq))
                return null;

            //CHECK IF CORSO IS OVER
            if (CorsoDAO.GetIsOver(id_c)==false)
                return null;

            //GET ALL INFO
            var tmp = GetSingleJoined(id_c, cod_fiscale);
            if (tmp == null)
                return null;

            //CREATE FILE
            var file = FileManager.CreatePDFByte(tmp.Item1.nome, tmp.Item1.cognome, tmp.Item2.nome, tmp.Item2.ore_tot, tmp.Item2.data_partenza.ToString("dd/MM/yyyy"), tmp.Item3.nome, tmp.Item3.cognome, tmp.Item2.id, tmp.Item1.cod_fiscale);
            DeleteFile(id_c, cod_fiscale);
        
            return file;
        }

       

        //METODI FREQUENZA
        public static Frequenza? GetSingle(int id_c, string cod_fiscale)
        {
            Frequenza tmp = new Frequenza { cod_fiscale = cod_fiscale, id_c = id_c };
            if (!AllExist(tmp))
                return null;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.frequenza WHERE id_c=@id_c AND cod_fiscale=@cod_fiscale";
                return db.Query<Frequenza>(sql,tmp ).SingleOrDefault();
            }
        }
        public static List<Frequenza> GetAll()
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.frequenza";
                return db.Query<Frequenza>(sql).ToList();
            }
        }

        public static List<Frequenza>? GetAllStudente(string cod_fiscale)
        {
            if (StudenteDAO.GetSingle(cod_fiscale) == null)
                return null;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.frequenza WHERE cod_fiscale=@cod_fiscale";
                return db.Query<Frequenza>(sql, new {cod_fiscale}).ToList();
            }
        }

        public static List<Frequenza>? GetAllCorso(int id_c)
        {
            if (CorsoDAO.GetSingle(id_c) == null)
                return null;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.frequenza WHERE id_c=@id_c";
                return db.Query<Frequenza>(sql, new { id_c }).ToList();
            }
        }

        public static int Insert(Frequenza frequenza)
        {
            //CONTROLLO CHE LO STUDENTE E IL CORSO ESISTANO
            if (!AllExist(frequenza))
                return 0;
            if (GetSingle(frequenza.id_c, frequenza.cod_fiscale) != null)
                return 0;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "INSERT INTO public.frequenza(cod_fiscale,id_c)" +
                    "VALUES(@cod_fiscale,@id_c)";
                return db.Execute(sql, frequenza);
            }
        }


        public static int Delete(int id_c, string cod_fiscale)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "DELETE FROM public.frequenza WHERE cod_fiscale=@cod_fiscale AND id_c=@id_c";
                return db.Execute(sql, new {cod_fiscale = cod_fiscale, id_c = id_c});
            }
            
        }

        public static Tuple<Studente,Corso,Docente>? GetSingleJoined(int id_c, string cod_fiscale)
        {
            var tmp = new Frequenza { id_c = id_c, cod_fiscale = cod_fiscale };
            if (!AllExist(tmp))
                return null;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.studente s INNER JOIN public.frequenza f ON s.cod_fiscale = f.cod_fiscale INNER JOIN public.corso c ON f.id_c = c.id INNER JOIN public.docente d ON c.id_d=d.id WHERE c.id=@id_c AND s.cod_fiscale=@cod_fiscale";
                var res = db.Query<Studente, Corso, Docente, Tuple<Studente, Corso, Docente>>(sql, (Studente, Corso, Docente) => Tuple.Create(Studente, Corso, Docente), tmp);
                return res.SingleOrDefault();
            }
        }

        static bool AllExist(Frequenza frequenza)
        {
            if (StudenteDAO.GetSingle(frequenza.cod_fiscale) == null)
                return false;
            else if (CorsoDAO.GetSingle(frequenza.id_c) == null)
                return false;
            else
                return true;
        }

        static void DeleteFile(int id_c, string cod_fiscale)
        {
            var currentSavePdf = FileManager.PDFFolderPath + id_c + cod_fiscale + ".pdf";
            var currentSaveWord = FileManager.WORDFolderPath + id_c + cod_fiscale + ".docx";

            File.Delete(currentSavePdf);
            File.Delete(currentSaveWord);
        }

        //public static List<Tuple<Studente,Corso,Docente>> GetAllJoined()
        //{
        //    using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
        //    {
        //        string sql = "SELECT * FROM public.studente s INNER JOIN public.frequenza f ON s.cod_fiscale = f.cod_fiscale INNER JOIN public.corso c ON f.id_c = c.id INNER JOIN public.docente d ON c.id_d=d.id";
        //        var res = db.Query<Studente, Corso, Docente, Tuple<Studente, Corso, Docente>>(sql, (Studente, Corso, Docente) => Tuple.Create(Studente, Corso, Docente));
        //        return res.ToList();
        //    }
        //}

        //public static List<Tuple<Studente,Corso,Docente>>? GetAllStudenteJoined(string cod_fiscale)
        //{
        //    if (StudenteDAO.GetSingle(cod_fiscale) == null)
        //        return null;

        //    using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
        //    {
        //        string sql = "SELECT * FROM public.studente s INNER JOIN public.frequenza f ON s.cod_fiscale = f.cod_fiscale INNER JOIN public.corso c ON f.id_c = c.id INNER JOIN public.docente d ON c.id_d=d.id WHERE s.cod_fiscale=@cod_fiscale";
        //        var res = db.Query<Studente, Corso, Docente, Tuple<Studente, Corso, Docente>>(sql, (Studente, Corso, Docente) => Tuple.Create(Studente, Corso, Docente), new {cod_fiscale});
        //        return res.ToList();
        //    }
        //}

        //public static List<Tuple<Studente,Corso,Docente>>? GetAllCorsoJoined(int id_c)
        //{
        //    if (CorsoDAO.GetSingle(id_c) == null)
        //        return null;

        //    using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
        //    {
        //        string sql = "SELECT * FROM public.studente s INNER JOIN public.frequenza f ON s.cod_fiscale = f.cod_fiscale INNER JOIN public.corso c ON f.id_c = c.id INNER JOIN public.docente d ON c.id_d=d.id WHERE c.id=@id_c";
        //        var res = db.Query<Studente, Corso, Docente, Tuple<Studente, Corso, Docente>>(sql, (Studente, Corso, Docente) => Tuple.Create(Studente, Corso, Docente), new {id_c});
        //        return res.ToList();
        //    }
        //} 
        //public static List<Tuple<Studente,Corso,Docente>>? GetAllDocenteJoined(int id)
        //{
        //    if (DocenteDAO.GetSingle(id) == null)
        //        return null;

        //    using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
        //    {
        //        string sql = "SELECT * FROM public.studente s INNER JOIN public.frequenza f ON s.cod_fiscale = f.cod_fiscale INNER JOIN public.corso c ON f.id_c = c.id INNER JOIN public.docente d ON c.id_d=d.id WHERE d.id=@id";
        //        var res = db.Query<Studente, Corso, Docente, Tuple<Studente, Corso, Docente>>(sql, (Studente, Corso, Docente) => Tuple.Create(Studente, Corso, Docente), new {id});
        //        return res.ToList();
        //    }
        //}

    }
}
