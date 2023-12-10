using AutoMapper;
using CityManagerApi.Data.Abstract;
using CityManagerApi.Dtos;
using CityManagerApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityManagerApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        public CitiesController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public IActionResult GetCities(int id)
        {
            //var dtos=_appRepository.GetCities(id)
            //        .Select(c =>
            //        {
            //            return new CityForListDto
            //            {
            //                 Description = c.Description,
            //                 Id = c.Id,
            //                 Name = c.Name,
            //                 PhotoUrl=c.CityImages.FirstOrDefault(p=>p.IsMain).Url
            //            };
            //        });
            var items = _appRepository.GetCities(id);
            var dtos = _mapper.Map<IEnumerable<CityForListDto>>(items);

            return Ok(dtos);
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] CityDto dto)
        {
            var entity = _mapper.Map<City>(dto);
            _appRepository.Add(entity);
            _appRepository.SaveAll();
            var returnedDto = _mapper.Map<CityDto>(entity);
            return Ok(returnedDto);
        }
    }
}
