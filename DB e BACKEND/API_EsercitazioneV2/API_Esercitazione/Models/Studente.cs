namespace API_Esercitazione.Models
{
    public class Studente
    {
        public string cod_fiscale { get; set; }
        public string nome { get; set; }
        public string cognome { get; set; }
        public DateTime data_nascita { get; set; }
        public string comune_nascita { get; set; }
        public string num_tel { get; set; }
        public string indirizzo_res { get; set; }
        public string civico_res { get; set; }
        public int cap_res { get; set; }
        public DateTime doi { get; set; }
        public DateTime dou { get; set; }

    }
}
