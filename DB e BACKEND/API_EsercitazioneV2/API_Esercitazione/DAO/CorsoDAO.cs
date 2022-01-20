using API_Esercitazione.Models;
using System.Data;
using Dapper;
using Npgsql;

namespace API_Esercitazione.DAO
{
    public class CorsoDAO
    {
        public static List<Corso> GetAll() {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.corso";
                return db.Query<Corso>(sql).ToList();
            }
        }

        public static Corso? GetSingle(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT * FROM public.corso WHERE id=@id";
                return db.Query<Corso>(sql, new {id}).SingleOrDefault();
            }
        }


        //AUTOMATICALLY SET "is_over" AS false
        public static int Insert(Corso corso)
        {
            //VERIFICA CHE IL DOCENTE PASSATO ESISTA
            if (DocenteDAO.GetSingle(corso.id_d) == null)
                return 0;
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {   
                string sql = "INSERT INTO public.corso(nome,descrizione,data_partenza,data_conclusione,id_d, ore_tot)"+
                    "VALUES(@nome,@descrizione,@data_partenza,@data_conclusione,@id_d,@ore_tot)";
                return db.Execute(sql,corso);
            }
        }

        public static int Delete(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "DELETE FROM public.corso WHERE id=@id";
                return db.Execute(sql, new { id });
            }
        }
        public static int Update(Corso corso)
        {
            //PRENDO IL VECCHIO CORSO
            Corso old = GetSingle(corso.id);

            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "UPDATE public.corso SET nome=@nome, descrizione=@descrizione, data_partenza=@data_partenza, data_conclusione=@data_conclusione, id_d=@id_d, ore_tot=@ore_tot, is_over=@is_over" +
                    " WHERE id=@id";
                return db.Execute(sql, corso);
            }
        }

        
        public static int SetIsOver(bool is_over, int id)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "UPDATE public.corso SET is_over=@is_over" +
                    " WHERE id=@id";
                return db.Execute(sql, new {is_over, id});
                /*if (is_over)
                    return CreateAllAttestati(id, ok);

                else
                    return DeleteAllAttestati(id, ok);*/
            }
        }

        public static bool GetIsOver(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(Config.GetConnection()))
            {
                string sql = "SELECT is_over FROM public.corso WHERE id=@id";
                return db.Query<bool>(sql, new { id }).Single();
            }
        }

        /*static int CreateAllAttestati(int id, int ok)
        {
            //SE IL METODO "SetIsOver" NON è ANDATO A BUON FINE
            if (!ok.Equals(1))
                return 0;

            List<Frequenza> tmp = new List<Frequenza>();
            tmp = FrequenzaDAO.GetAllCorso(id);
            foreach(var elem in tmp)
            {
                FrequenzaDAO.InsertAttestato(id,elem.cod_fiscale);
            }
            return 1;
        }

        static int DeleteAllAttestati(int id, int ok)
        {
            //SE IL METODO "SetIsOver" NON è ANDATO A BUON FINE
            if (!ok.Equals(1))
                return 0;
            List<Frequenza> tmp = new List<Frequenza>();
            tmp = FrequenzaDAO.GetAllCorso(id);
            foreach (var elem in tmp)
            {
                FrequenzaDAO.DeleteAttestato(id, elem.cod_fiscale);
            }
            return 1;
        }*/
    }
}
