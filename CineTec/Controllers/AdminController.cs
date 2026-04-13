using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CineTec.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminloginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AdminloginController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public IActionResult AuthAdmin([FromQuery] string user, [FromQuery] string pswrd)
        {
            // obtenidos de appsettings.json
            string AdminUser = _config.GetValue<string>("AdminUser");
            string AdminPswrd = _config.GetValue<string>("AdminPswrd");
            Console.WriteLine(AdminUser + " " + AdminPswrd);
            Console.WriteLine(user + " " + pswrd);
            if (AdminPswrd == pswrd && user == AdminUser)
            {
                Console.WriteLine("si");
                return Ok(true);
            }
            return Ok(false);
        }
    }
}
