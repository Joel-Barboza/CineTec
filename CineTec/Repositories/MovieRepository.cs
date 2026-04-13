using CineTec.Entities;
using System.Text.Json;

namespace CineTec.Repositories
{
    // el repositorio se encarga de la persistencia de datos, es decir, guardar y obtener datos de una fuente (en este caso un archivo JSON)
    public class MovieRepository
    {
        private readonly string filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Storage",
            "movies.json");

        public List<Movie> GetAll()
        {
            if (!File.Exists(filePath))
                return new List<Movie>();

            var json = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Movie>>(json) ?? new List<Movie>();
        }

        public void Add(Movie movie)
        {
            var movies = GetAll();
            movies.Add(movie);

            var json = JsonSerializer.Serialize(movies, new JsonSerializerOptions
            {
                WriteIndented = true // para que lo guarde con identaciones
            });

            File.WriteAllText(filePath, json);
        }
    }
}