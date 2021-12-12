using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ctrip.API.Dtos
{
    public class RegisterDto
    {
        [JsonRequired]
        [JsonProperty("email")]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        
        [JsonRequired]
        [JsonProperty("password")]
        [MaxLength(32)]
        public string Password { get; set; }

        [JsonRequired]
        [JsonProperty("confirm_password")]
        [Compare(nameof(Password), ErrorMessage = "密码输入不一致")]
        [MaxLength(32)]
        public string ConfirmPassword { get; set; }
    }
}
