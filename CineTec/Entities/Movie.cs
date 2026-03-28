namespace CineTec.Entities
{
    public class Movie(string originalName, string commercialName, string imageUrl, int duration, List<string> mainActors, string director, string rating)
    {
        public string OriginalName { get; set; } = originalName;
        public string CommercialName { get; set; } = commercialName;
        public string ImageUrl { get; set; } = imageUrl; // no mandamos directamente la imagen
        public int Duration { get; set; } = duration;
        public List<string> MainActors { get; set; } = mainActors;
        public string Director { get; set; } = director;
        public string Rating { get; set; } = rating;
    }
}
