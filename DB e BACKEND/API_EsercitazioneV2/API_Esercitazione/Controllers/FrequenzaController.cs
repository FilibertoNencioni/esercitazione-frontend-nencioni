using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_Esercitazione.Models;
using API_Esercitazione.DAO;
using System.Net;

namespace API_Esercitazione.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FrequenzaController : ControllerBase
    {
        [HttpGet]
        [Route("GetSingle")]
        public Frequenza? GetSingle(int id_c, string cod_fiscale){
            cod_fiscale = cod_fiscale.ToUpper();
            return FrequenzaDAO.GetSingle(id_c, cod_fiscale);
        }

        [HttpGet]
        [Route("GetAll")]
        public List<Frequenza> GetAll()
        {
            return FrequenzaDAO.GetAll();
        }


        [HttpGet]
        [Route("GetAllStudente")]
        public List<Frequenza>? GetAllStudente(string cod_fiscale)
        {
            cod_fiscale = cod_fiscale.ToUpper();
            return FrequenzaDAO.GetAllStudente(cod_fiscale);
        }

        [HttpGet]
        [Route("GetAllCorso")]
        public List<Frequenza>? GetAllCorso(int id_c)
        {
            return FrequenzaDAO.GetAllCorso(id_c);
        }

        [HttpPost]
        [Route("Insert")]

        public int Insert([FromBody] Frequenza frequenza)
        {
            frequenza.cod_fiscale = frequenza.cod_fiscale.ToUpper();
            return FrequenzaDAO.Insert(frequenza);
        }

        [HttpDelete]
        [Route("Delete")]
        public int Delete(int id_c, string cod_fiscale)
        {
            cod_fiscale = cod_fiscale.ToUpper();
            return FrequenzaDAO.Delete(id_c, cod_fiscale);
        }

        //ATTESTATO
        [HttpGet]
        [Route("GetAttestato")]
        public IActionResult GetAttestato(int id_c, string cod_fiscale)
        {
            cod_fiscale = cod_fiscale.ToUpper();
            
            var pdfBytes = FrequenzaDAO.GetAttestato(id_c, cod_fiscale);
            if(pdfBytes == null)
                return NotFound();

            return new FileStreamResult(new MemoryStream(pdfBytes), "application/pdf");
        }
        
    }
}
