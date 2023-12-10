using CityManagerApi.Data.Abstract;
using CityManagerApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace CityManagerApi.Data.Concrete
{
    public class AppRepository : IAppRepository
    {
        private DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public List<City> GetCities(int userId)
        {
            var cities=_context
                .Cities
                .Include(c=>c.CityImages)
                .Where(c=>c.UserId == userId)
                .ToList();
            return cities;
        }

        public City GetCityById(int cityId)
        {
            var city=_context
                .Cities
                .Include(c=>c.CityImages)
                .FirstOrDefault(c=>c.Id == cityId);
            return city;
        }

        public List<CityImage> GetPhotosByCityId(int cityId)
        {
            throw new NotImplementedException();
        }

        public CityImage GetPhotoById(int photoId)
        {
            var photo=_context
                .CityImages
                .FirstOrDefault(c=>c.Id == photoId);
            return photo;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
