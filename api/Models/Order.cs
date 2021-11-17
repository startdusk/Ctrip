using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ctrip.API.Models
{
    public enum OrderStateEnum
    {
        Pending, // 订单已生成
        Processing, // 支付处理中
        Completed, // 交易成功
        Declined, // 交易失败
        Cancelled, // 订单取消
        Refound, // 已退款
    }
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }

        // 一个购物车有且仅有一个用户外键
        // User是数据库外键对象，所以它不会参与数据库结构的创建
        public ApplicationUser User { get; set; }
        public ICollection<LineItem> OrderItems { get; set; }

        public OrderStateEnum State { get; set; }
        public DateTime CreateDateUTC { get; set; }

        public string TransactionMetadata { get; set; }
    }
}
