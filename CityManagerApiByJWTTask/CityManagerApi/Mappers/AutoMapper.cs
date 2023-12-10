using AutoMapper;
using CityManagerApi.Dtos;
using CityManagerApi.Entities;

namespace CityManagerApi.Mappers
{
    public class AutoMapper:Profile
    {
        public AutoMapper()
        {
            CreateMap<City, CityForListDto>()
                .ForMember(dest => dest.PhotoUrl, option =>
                {
                    option.MapFrom(src => src.CityImages.FirstOrDefault(p => p.IsMain).Url);
                });

            CreateMap<City, CityDto>().ReverseMap();   
        }
    }
}
