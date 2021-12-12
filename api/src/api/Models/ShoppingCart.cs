using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ctrip.API.Models
{
    public class ShoppingCart
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        // 一个购物车有且仅有一个用户外键
        // User是数据库外键对象，所以它不会参与数据库结构的创建
        public ApplicationUser User { get; set; }
        public ICollection<LineItem> ShoppingCartItems { get; set; }
    }
}
