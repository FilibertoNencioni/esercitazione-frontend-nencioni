using API_Esercitazione.Models;
using System.Data;
using Dapper;
using Npgsql;

namespace API_Esercitazione.DAO
{
    public class StudenteDAO
    {

        public static List<Studente> GetAll()
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.studente";
                return db.Query<Studente>(sql).ToList();
            }
        }
        public static Studente? GetSingle(string cod_fiscale)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.studente WHERE cod_fiscale=@cod_fiscale";
                return db.Query<Studente>(sql, new {cod_fiscale}).SingleOrDefault();
            }
        }
        public static int Insert(Studente studente)
        {
            using(IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "INSERT INTO public.studente(cod_fiscale,nome,cognome,data_nascita,comune_nascita,num_tel,indirizzo_res,civico_res,cap_res) " +
                    "VALUES(@cod_fiscale,@nome,@cognome,@data_nascita,@comune_nascita,@num_tel,@indirizzo_res,@civico_res,@cap_res)";
                return db.Execute(sql, studente);
            }
        }
        public static int Delete(string cod_fiscale)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "DELETE FROM public.studente WHERE cod_fiscale=@cod_fiscale";
                return db.Execute(sql, new {cod_fiscale});
            }
        }
        public static int Update(Studente studente)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "UPDATE public.studente SET nome=@nome, cognome=@cognome, data_nascita=@data_nascita, comune_nascita=@comune_nascita, num_tel=@num_tel, indirizzo_res=@indirizzo_res, civico_res=@civico_res,cap_res=@cap_res"+
                    " WHERE cod_fiscale=@cod_fiscale";
                return db.Execute(sql,studente);
            }
        }
    }
}
