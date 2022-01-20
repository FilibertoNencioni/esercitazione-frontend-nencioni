using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_Esercitazione.Models;
using API_Esercitazione.DAO;

namespace API_Esercitazione.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CorsoController : ControllerBase
    {
        [HttpGet]
        [Route("GetAll")]
        public List<Corso> GetAll()
        {
            return CorsoDAO.GetAll();
        }

        [HttpGet]
        [Route("GetSingle")]
        public Corso? GetSingle(int id)
        {
            if(id.Equals(0)||id.Equals(null))
                return null;
            return CorsoDAO.GetSingle(id);
        }

        [HttpPost]
        [Route("Insert")]
        public int Insert([FromBody] Corso corso)
        {
            return CorsoDAO.Insert(corso);
        }

        [HttpPut]
        [Route("SetIsOver")]
        public int SetIsOver(bool is_over, int id)
        {
            return CorsoDAO.SetIsOver(is_over, id);
        }

        [HttpPut]
        [Route("Update")]
        public int Update([FromBody] Corso corso)
        {
            if (CorsoDAO.GetSingle(corso.id) == null)
                return 0;
            return CorsoDAO.Update(corso);
        }

        [HttpDelete]
        [Route("Delete")]
        public int Delete(int id)
        {
            if (CorsoDAO.GetSingle(id) == null)
                return 0;
            return CorsoDAO.Delete(id);
        }
    }
}
