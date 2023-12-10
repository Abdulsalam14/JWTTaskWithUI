namespace CityManagerApi.Entities
{
    public class City
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; } = null;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<CityImage>? CityImages { get; set; }

    }
}
