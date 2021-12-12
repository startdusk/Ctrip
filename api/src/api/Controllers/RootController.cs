using System.Collections.Generic;
using Ctrip.API.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Ctrip.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class RootController : ControllerBase
    {
        [HttpGet(Name = "GetRoot")]
        public IActionResult Get()
        {
            var links = new List<LinkDto>();

            // 自我链接
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("GetRoot", null),
                    Rel = "self",
                    Method = "GET"
                });

            // 一级链接 旅游路线 “GET api/touristRoutes”
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("GetTouristRoutes", null),
                    Rel = "get_tourist_routes",
                    Method = "GET"
                });

            // 一级链接 旅游路线 “POST api/touristRoutes”
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("CreateTouristRoute", null),
                    Rel = "create_tourist_route",
                    Method = "POST"
                });

            // 一级链接 购物车 “GET api/orders”
            links.Add(
                new LinkDto()
                {
                    Href = Url.Link("GetShoppingCart", null),
                    Rel = "get_shopping_cart",
                    Method = "GET"
                });

            // 一级链接 订单 “GET api/shoppingCart”
            links.Add(new LinkDto()
            {
                Href = Url.Link("GetOrders", null),
                Rel = "get_orders",
                Method = "GET"
            });

            return Ok(links);
        }
    }
}