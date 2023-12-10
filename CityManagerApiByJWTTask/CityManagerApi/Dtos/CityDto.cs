using CityManagerApi.Entities;

namespace CityManagerApi.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
