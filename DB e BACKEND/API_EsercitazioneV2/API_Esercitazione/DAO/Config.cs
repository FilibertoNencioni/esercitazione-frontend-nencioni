using Microsoft.Extensions.Configuration;

namespace API_Esercitazione.DAO
{
    public static class Config
    {
        static string connectionString = null;

        public static string GetConnection()
        {
            if (connectionString == null)
                connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["DefaultConnection"];
            return connectionString;
        }
        
    }
}