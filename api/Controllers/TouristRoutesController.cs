using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ctrip.API.Dtos;
using Ctrip.API.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Ctrip.API.ResourceParameters;
using Ctrip.API.Models;
using Microsoft.AspNetCore.JsonPatch;
using Ctrip.API.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Ctrip.API.Controllers
{
    [Route("api/[controller]")] // api/touristroute
    [ApiController]
    public class TouristRoutesController : ControllerBase
    {
        private readonly ITouristRouteRepository _touristRouteRepository;
        private readonly IMapper _mapper;
        private readonly IUrlHelper _urlHelper;
        private readonly IPropertyMappingService _propertyMappingService;

        public TouristRoutesController(
            ITouristRouteRepository touristRouteRepository,
            IMapper mapper,
            IUrlHelperFactory urlHelperFactory,
            IActionContextAccessor actionContextAccessor,
            IPropertyMappingService propertyMappingService
        )
        {
            _touristRouteRepository = touristRouteRepository;
            _mapper = mapper;
            _urlHelper = urlHelperFactory.GetUrlHelper(actionContextAccessor.ActionContext);
            _propertyMappingService = propertyMappingService;
        }

        // api/touristRoutes?keyword=传入的参数
        [HttpGet(Name = "GetTouristRoutes")]
        [HttpHead]
        public async Task<IActionResult> GetTouristRoutes(
            [FromQuery] TouristRouteResourceParamaters paramaters
        //[FromQuery] string keyword,
        //string rating // 小于lessThan, 大于largerThan, 等于equalTo lessThan3, largerThan2, equalTo5 
        )// FromQuery vs FromBody
        {
            if (!_propertyMappingService.IsMappingExists<TouristRouteDto, TouristRoute>(paramaters.OrderBy))
            {
                return BadRequest("请输入正确的排序参数");
            }
            if (!_propertyMappingService.IsPropertiesExists<TouristRouteDto>(paramaters.Fields))
            {
                return BadRequest("请输入正确的塑形参数");
            }

            var touristRoutesFromRepo = await _touristRouteRepository.GetTouristRoutesAsync(
                paramaters.Keyword,
                paramaters.RatingOperator,
                paramaters.RatingValue,
                paramaters.PageNumber,
                paramaters.PageSize,
                paramaters.OrderBy
            );
            if (touristRoutesFromRepo == null || touristRoutesFromRepo.Count() <= 0)
            {
                return NotFound("没有旅游路线");
            }
            var touristRoutesDto = _mapper.Map<IEnumerable<TouristRouteDto>>(touristRoutesFromRepo);

            var previousPageLink = touristRoutesFromRepo.HasPrevious
                ? GenerateTouristRouteResourceURL(paramaters, ResourceUriType.PreviousPage) : null;
            var nextPageLink = touristRoutesFromRepo.HasNext
                ? GenerateTouristRouteResourceURL(paramaters, ResourceUriType.NextPage) : null;

            // 添加分页元信息头部 X-Pagination 
            var paginationMetadata = new
            {
                previousPageLink,
                nextPageLink,
                totalCount = touristRoutesFromRepo.TotalCount,
                pageSize = touristRoutesFromRepo.PageSize,
                currentPage = touristRoutesFromRepo.CurrentPage,
                totalPage = touristRoutesFromRepo.TotalPages
            };
            Response.Headers.Add("X-Pagination", Newtonsoft.Json.JsonConvert.SerializeObject(paginationMetadata));
            var shapedDtoList = touristRoutesDto.ShapeData(paramaters.Fields);
            var linkDto = CreateLinkForTouristRouteList(paramaters);
            var shapedDtoWithLinkList = shapedDtoList.Select(t =>
            {
                var touristRouteDictionary = t as IDictionary<string, object>;
                var links = CreateLinkForTouristRoute((Guid)touristRouteDictionary["Id"], null);
                touristRouteDictionary.Add("links", links);
                return touristRouteDictionary;
            });

            var result = new
            {
                value = shapedDtoWithLinkList,
                links = linkDto
            };

            return Ok(result);
        }

        // api/touristroutes/{touristRouteId}
        [HttpGet("{touristRouteId}", Name = "GetTouristRouteById")]
        public async Task<IActionResult> GetTouristRouteById(
            [FromRoute] Guid touristRouteId,
            [FromQuery] string fields
            )
        {
            var touristRouteFromRepo = await _touristRouteRepository.GetTouristRouteAsync(touristRouteId);
            if (touristRouteFromRepo == null)
            {
                return NotFound($"旅游路线{touristRouteId}找不到");
            }

            if (!_propertyMappingService.IsPropertiesExists<TouristRouteDto>(fields))
            {
                return BadRequest("请输入正确的塑形参数");
            }

            var touristRouteDto = _mapper.Map<TouristRouteDto>(touristRouteFromRepo);
            var result = touristRouteDto.ShapeData(fields) as IDictionary<string, object>;
            var links = CreateLinkForTouristRoute(touristRouteId, fields);
            result.Add("links", links);
            return Ok(result);
        }

        [HttpPost(Name = "CreateTouristRoute")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTouristRoute([FromBody] TouristRouteForCreationDto touristRouteForCreationDto)
        {
            var touristRouteModel = _mapper.Map<TouristRoute>(touristRouteForCreationDto);
            touristRouteModel.CreateTime = DateTime.Now;
            _touristRouteRepository.AddTouristRoute(touristRouteModel);
            await _touristRouteRepository.SaveAsync();
            var touristRouteToReture = _mapper.Map<TouristRouteDto>(touristRouteModel);

            var links = CreateLinkForTouristRoute(touristRouteToReture.Id, null);
            var result = touristRouteToReture.ShapeData(null) as IDictionary<string, object>;
            result.Add("links", links);
            return CreatedAtRoute(
                "GetTouristRouteById",
                new { touristRouteId = touristRouteToReture.Id },
                result
            );
        }

        [HttpPut("{touristRouteId}", Name = "UpdateTouristRoute")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTouristRoute(
            [FromRoute] Guid touristRouteId,
            [FromBody] TouristRouteForUpdateDto touristRouteForUpdateDto
        )
        {
            if (!(await _touristRouteRepository.TouristRouteExistsAsync(touristRouteId)))
            {
                return NotFound("旅游路线找不到");
            }

            var touristRouteFromRepo = await _touristRouteRepository.GetTouristRouteAsync(touristRouteId);
            // 1. 映射dto
            // 2. 更新dto
            // 3. 映射model
            _mapper.Map(touristRouteForUpdateDto, touristRouteFromRepo);
            touristRouteFromRepo.UpdateTime = DateTime.Now;
            await _touristRouteRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{touristRouteId}", Name = "PartiallyUpdateTouristRoute")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PartiallyUpdateTouristRoute(
            [FromRoute] Guid touristRouteId,
            [FromBody] JsonPatchDocument<TouristRouteForUpdateDto> patchDocument
        )
        {
            if (!(await _touristRouteRepository.TouristRouteExistsAsync(touristRouteId)))
            {
                return NotFound("旅游路线找不到");
            }

            var touristRouteFromRepo = await _touristRouteRepository.GetTouristRouteAsync(touristRouteId);
            var touristRouteToPatch = _mapper.Map<TouristRouteForUpdateDto>(touristRouteFromRepo);
            patchDocument.ApplyTo(touristRouteToPatch, ModelState);
            if (!TryValidateModel(touristRouteToPatch))
            {
                return ValidationProblem(ModelState);
            }
            _mapper.Map(touristRouteToPatch, touristRouteFromRepo);
            touristRouteFromRepo.UpdateTime = DateTime.Now;
            await _touristRouteRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{touristRouteId}", Name = "DeleteTouristRoute")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTouristRoute([FromRoute] Guid touristRouteId)
        {
            if (!(await _touristRouteRepository.TouristRouteExistsAsync(touristRouteId)))
            {
                return NotFound("旅游路线找不到");
            }

            var touristRoute = await _touristRouteRepository.GetTouristRouteAsync(touristRouteId);
            touristRoute.DepartureTime = DateTime.Now;
            _touristRouteRepository.DeleteTouristRoute(touristRoute);
            await _touristRouteRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("({touristIDs})")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteByIDs(
            [ModelBinder(BinderType = typeof(ArrayModelBinder))][FromRoute] IEnumerable<Guid> touristIDs)
        {
            if (touristIDs == null)
            {
                return BadRequest();
            }

            var touristRoutesFromRepo = await _touristRouteRepository.GetTouristRoutesByIDListAsync(touristIDs);
            _touristRouteRepository.DeleteTouristRoutes(touristRoutesFromRepo);
            await _touristRouteRepository.SaveAsync();

            return NoContent();
        }

        private string GenerateTouristRouteResourceURL(
            TouristRouteResourceParamaters paramaters,
            ResourceUriType type
        )
        {
            return type switch
            {
                ResourceUriType.PreviousPage => _urlHelper.Link("GetTouristRoutes",
                    new
                    {
                        fields = paramaters.Fields,
                        orderBy = paramaters.OrderBy,
                        keyword = paramaters.Keyword,
                        rating = paramaters.Rating,
                        pageNumber = paramaters.PageNumber - 1,
                        pageSize = paramaters.PageSize
                    }),
                ResourceUriType.NextPage => _urlHelper.Link("GetTouristRoutes",
                    new
                    {
                        fields = paramaters.Fields,
                        orderBy = paramaters.OrderBy,
                        keyword = paramaters.Keyword,
                        rating = paramaters.Rating,
                        pageNumber = paramaters.PageNumber + 1,
                        pageSize = paramaters.PageSize
                    }),
                _ => _urlHelper.Link("GetTouristRoutes",
                    new
                    {
                        fields = paramaters.Fields,
                        orderBy = paramaters.OrderBy,
                        keyword = paramaters.Keyword,
                        rating = paramaters.Rating,
                        pageNumber = paramaters.PageNumber,
                        pageSize = paramaters.PageSize
                    })
            };
        }

        private IEnumerable<LinkDto> CreateLinkForTouristRoute(
            Guid touristRouteId,
            string fields)
        {
            var links = new List<LinkDto>();

            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("GetTouristRouteById", new { touristRouteId, fields }),
                    Rel = "self",
                    Method = "GET"
                });

            // 更新
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("UpdateTouristRoute", new { touristRouteId }),
                    Rel = "update",
                    Method = "PUT"
                });

            // 局部更新 
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("PartiallyUpdateTouristRoute", new { touristRouteId }),
                    Rel = "partially_update",
                    Method = "PATCH"
                });

            // 删除
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("DeleteTouristRoute", new { touristRouteId }),
                    Rel = "delete",
                    Method = "DELETE"
                });

            // 获取路线图片
            links.Add(
                new LinkDto()
                {

                    Href = Url.Link("GetPictureListForTouristRoute", new { touristRouteId }),
                    Rel = "get_pictures",
                    Method = "GET"
                });

            // 添加新图片
            links.Add(
                new LinkDto()
                {

                    Href = Url.Link("CreateTouristRoutePicture", new { touristRouteId }),
                    Rel = "create_picture",
                    Method = "POST"
                });

            return links;
        }


        private IEnumerable<LinkDto> CreateLinkForTouristRouteList(
            TouristRouteResourceParamaters paramaters)
        {
            var links = new List<LinkDto>();
            // 添加self，自我链接
            links.Add(new LinkDto()
            {
                Href = GenerateTouristRouteResourceURL(paramaters, ResourceUriType.CurrentPage),
                Rel = "self",
                Method = "GET"
            });

            // api/touristRoutes
            // 添加创建旅游路线
            links.Add(new LinkDto()
            {
                Href = Url.Link("CreateTouristRoute", null),
                Rel = "create_tourist_route",
                Method = "POST"
            });
            return links;
        }
    }
}