using Newtonsoft.Json;

namespace Ctrip.API.Dtos
{
    public class TouristRoutePictureForCreationDto
    {

        [JsonRequired]
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
