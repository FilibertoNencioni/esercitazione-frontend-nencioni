using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_Esercitazione.DAO;
using API_Esercitazione.Models;

namespace API_Esercitazione.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocenteController : ControllerBase
    {
        [HttpGet]
        [Route("GetAll")]
        public List<Docente> GetAll()
        {
            return DocenteDAO.GetAll();
        }


        [HttpGet]
        [Route("GetSingle")]
        public Docente? GetSingle(int id)
        {
            return DocenteDAO.GetSingle(id);
        }

        [HttpPost]
        [Route("Insert")]
        public int Insert([FromBody] Docente docente)
        {
            return DocenteDAO.Insert(docente);
        }

        [HttpPut]
        [Route("Update")]
        public int Update([FromBody] Docente docente)
        {
            return DocenteDAO.Update(docente);
        }

        [HttpDelete]
        [Route("Delete")]
        public int Delete(int id)
        {
            return DocenteDAO.Delete(id);
        }
    }
}
