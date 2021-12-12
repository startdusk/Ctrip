﻿using Ctrip.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ctrip.API.Dtos
{
    public class ShoppingCartDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public ICollection<LineItemDto> ShoppingCartItems { get; set; }
    }
}