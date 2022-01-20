using API_Esercitazione.Models;
using System.Data;
using Dapper;
using Npgsql;

namespace API_Esercitazione.DAO
{
    public class DocenteDAO
    {
        public static Docente? GetSingle(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.docente WHERE id=@id";
                return db.Query<Docente>(sql, new { id }).FirstOrDefault();
            }
        }

        public static List<Docente> GetAll()
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.docente";
                return db.Query<Docente>(sql).ToList();
            }
        }

        public static int Insert(Docente docente)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "INSERT INTO public.docente(nome,cognome,specializzazione)" +
                    "VALUES(@nome,@cognome,@specializzazione)";
                return db.Execute(sql, docente);
            }
        }

        public static int Update(Docente docente)
        {
            if (DocenteDAO.GetSingle(docente.id) == null)
                return 0;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "UPDATE public.docente SET nome=@nome, cognome=@cognome, specializzazione=@specializzazione" +
                    " WHERE id=@id";
                return db.Execute(sql, docente);
            }
        }

        public static int Delete(int id)
        {
            if (DocenteDAO.GetSingle(id) == null)
                return 0;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "DELETE FROM public.docente WHERE id=@id";
                return db.Execute(sql, new { id });
            }
        }
    }
}
