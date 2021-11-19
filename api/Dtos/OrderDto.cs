using System;
using System.Collections.Generic;

namespace Ctrip.API.Dtos
{
    public class OrderDto
    {

        public Guid Id { get; set; }
        public string UserId { get; set; }

        // User是数据库外键对象，所以它不会参与数据库结构的创建
        public ICollection<LineItemDto> OrderItems { get; set; }

        public string State { get; set; }
        public DateTime CreateDateUTC { get; set; }

        public string TransactionMetadata { get; set; }

    }
}