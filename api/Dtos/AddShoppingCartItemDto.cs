using System;
using Newtonsoft.Json;

namespace Ctrip.API.Dtos
{
    public class AddShoppingCartItemDto
    {
        [JsonProperty("tourist_route_id")]
        [JsonRequired]
        public Guid TouristRouteId { get; set; }
    }
}
