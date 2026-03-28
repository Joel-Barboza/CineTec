using CineTec.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CineTec.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly string filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "DataFiles",
            "movies.json");


        [HttpGet(Name = "GetAllMovies")] // frontend pide a backend, probar en http://localhost:5000/api/movies
        public IEnumerable<Movie> GetAllRoutes()
        {
            if (!System.IO.File.Exists(filePath))
                return new List<Movie>();

            var json = System.IO.File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Movie>>(json);
        }

        // los cambios se ven en C:\inetpub\CineTec\DataFiles\movies.json no en el de visual studio
        [HttpPost(Name = "Add Movie")] // de frontend a backend
        public IActionResult AddMovie([FromBody] string movieName)
        {
            List<Movie> movies;

            if (System.IO.File.Exists(filePath))
            {
                var json = System.IO.File.ReadAllText(filePath);
                movies = JsonSerializer.Deserialize<List<Movie>>(json);
            }
            else
            {
                movies = new List<Movie>();
            }

            // por ahora solo se obtiene el nombre desde la pagina, el resto es por defecto
            var newMovie = new Movie(
                movieName,
                movieName + "shon",
                "url",
                120,
                new List<string>() { "prota1", "prota2" },
                "director",
                "todo publico");

            movies.Add(newMovie);


            var updatedJson = JsonSerializer.Serialize(movies, new JsonSerializerOptions
            {
                WriteIndented = true // para que lo guarde con identaciones
            });

            System.IO.File.WriteAllText(filePath, updatedJson);

            return Ok(newMovie);
        }
    }
}