using CineTec.Entities;
using CineTec.Repositories;

namespace CineTec.Services
{
    public class MovieService
    {
        // el servicio se encarga de la logica de negocio

        // el servicio se comunica con el repositorio para obtener o guardar datos
        private readonly MovieRepository _repository;

        public MovieService(MovieRepository repository)
        {
            _repository = repository;
        }

        public List<Movie> GetAllMovies()
        {
            return _repository.GetAll();
        }

        public void AddMovie(string movieName)
        {
            // por ahora solo se obtiene el nombre desde la pagina, el resto es por defecto
            var movie = new Movie(
                movieName,
                movieName + "eishon",
                "url",
                120,
                new List<string> { "prota1", "prota2" },
                "director",
                "todo publico"
            );

            _repository.Add(movie);
        }
    }
}