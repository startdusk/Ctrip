using Ctrip.API.ValidationAttributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ctrip.API.Dtos
{
    [TouristRouteTitleMustBeDifferentFromDescriptionAttribute]
    public abstract class TouristRouteForManipulationDto
    {
        [JsonRequired]
        [JsonProperty("title")]
        [MaxLength(100)]
        public string Title { get; set; }
        [JsonRequired]
        [JsonProperty("description")]
        [MaxLength(1500)]
        // virtual的字段才可以被override
        public virtual string Description { get; set; }
        // 计算方式：原价 * 折扣
        [JsonProperty("price")]
        public decimal Price { get; set; }
        [JsonProperty("original_price")]
        public decimal OriginalPrice { get; set; }
        [JsonProperty("discount_present")]
        public double? DiscountPresent { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public DateTime? DepartureTime { get; set; }
        [JsonProperty("features")]
        public string Features { get; set; }
        [JsonProperty("fees")]
        public string Fees { get; set; }
        [JsonProperty("notes")]
        public string Notes { get; set; }
        [JsonProperty("rating")]
        public double? Rating { get; set; }
        [JsonProperty("travel_days")]
        public string TravelDays { get; set; }
        [JsonProperty("trip_type")]
        public string TripType { get; set; }

        [JsonProperty("departure_city")]
        public string DepartureCity { get; set; }
        public ICollection<TouristRoutePictureForCreationDto> TouristRoutePictures { get; set; }
            = new List<TouristRoutePictureForCreationDto>();

    }
}
