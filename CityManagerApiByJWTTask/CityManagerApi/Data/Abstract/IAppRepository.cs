using CityManagerApi.Entities;

namespace CityManagerApi.Data.Abstract
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T:class;  
        void Delete<T>(T entity) where T:class;
        bool SaveAll();

        List<City> GetCities(int userId);
        List<CityImage> GetPhotosByCityId(int cityId);
        City GetCityById(int cityId);
        CityImage GetPhotoById(int photoId);
    }
}
