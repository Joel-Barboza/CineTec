using CineTec.Services;
using Microsoft.AspNetCore.Mvc;

namespace CineTec.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _service;

        public MoviesController(MovieService service)
        {
            _service = service;
        }

        [HttpGet] // frontend pide a backend, probar en http://localhost:5000/api/movies
        public IActionResult GetAll()
        {
            var movies = _service.GetAllMovies();
            return Ok(movies);
        }

        [HttpGet("latest")]
        public IActionResult GetLatest()
        {
            var movie = _service.GetLatestMovie();

            if (movie == null)
                return NotFound();

            
            var latest = movie;
            return Ok(latest);
        }

        // los cambios se ven en C:\inetpub\CineTec\DataFiles\movies.json no en el de visual studio
        [HttpPost] // de frontend a backend
        public IActionResult Add([FromBody] string[] movieDetails)
        {
            _service.AddMovie(movieDetails);
            return Ok(true);
        }
    }


}