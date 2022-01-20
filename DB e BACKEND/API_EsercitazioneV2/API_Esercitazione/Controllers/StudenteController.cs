using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_Esercitazione.DAO;
using API_Esercitazione.Models;

namespace API_Esercitazione.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudenteController : ControllerBase
    {
        [HttpGet]
        [Route("GetAll")]
        public List<Studente> GetAll()
        {
            return StudenteDAO.GetAll();
        }

        [HttpGet]
        [Route("GetSingle")]
        public Studente? GetSingle(string cod_fiscale)
        {
            cod_fiscale = cod_fiscale.ToUpper();
            if (cod_fiscale == null)
                return null;
            return StudenteDAO.GetSingle(cod_fiscale);
        }

        [HttpPost]
        [Route("Insert")]
        public int Insert([FromBody] Studente studente)
        {
            studente.cod_fiscale = studente.cod_fiscale.ToUpper();
            if (StudenteDAO.GetSingle(studente.cod_fiscale) != null)
                return 0;
            return StudenteDAO.Insert(studente);
        }

        [HttpPut]
        [Route("Update")]
        public int Update([FromBody] Studente studente)
        {
            studente.cod_fiscale = studente.cod_fiscale.ToUpper();
            if (StudenteDAO.GetSingle(studente.cod_fiscale) == null)
                return 0;
            return StudenteDAO.Update(studente);
        }

        [HttpDelete]
        [Route("Delete")]
        public int Delete(string cod_fiscale)
        {
            cod_fiscale = cod_fiscale.ToUpper();
            if (StudenteDAO.GetSingle(cod_fiscale) == null)
                return 0;
            return StudenteDAO.Delete(cod_fiscale);
        }
    }
}
