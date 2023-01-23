using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Post(string email, string password)
        {
            string query = @"SELECT * FROM users WHERE email='" + email + "' AND password='" + password +"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("databaseConnection");
            MySqlDataReader reader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand command = new MySqlCommand(query, mycon))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    mycon.Close();
                }
            }

            if(table.Rows.Count > 0)
            {
                return new JsonResult(table);
            }
            else
            {
                return new JsonResult("User not found");
            }
        }


    }
}
