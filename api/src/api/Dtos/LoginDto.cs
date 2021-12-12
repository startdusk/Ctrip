using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ctrip.API.Dtos
{
    public class LoginDto
    {
        [JsonRequired]
        [JsonProperty("email")]
        [MaxLength(100)]
        public string Email { get; set; }
        [JsonRequired]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
