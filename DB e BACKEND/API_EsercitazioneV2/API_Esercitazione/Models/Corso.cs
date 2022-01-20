namespace API_Esercitazione.Models
{
    public class Corso
    {
        public int id { get; set; }
        public string nome { get; set; } 
        public string? descrizione { get; set; }
        public DateTime data_partenza { get; set; }
        public DateTime data_conclusione { get; set; }
        public int id_d { get; set; }
        public int ore_tot { get; set; }
        public bool is_over { get; set; }


    }
}
