using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ctrip.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Address { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
        public ICollection<Order> Orders { get; set; }

        // 这里只需要用户角色就好了
        public virtual ICollection<IdentityUserRole<string>> UserRoles { get; set; }
        // public virtual ICollection<IdentityRoleClaim<string>> RoleClaims { get; set; }
        // public virtual ICollection<IdentityUserClaim<string>> UserClaims { get; set; }
        // public virtual ICollection<IdentityUserLogin<string>> UserLogins { get; set; }
        // public virtual ICollection<IdentityUserToken<string>> UserTokens { get; set; }

    }
}