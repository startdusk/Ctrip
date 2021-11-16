using AutoMapper;
using Ctrip.API.Dtos;
using Ctrip.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ctrip.API.Profiles
{
    public class ShoppingCartProfile : Profile
    {
        public ShoppingCartProfile()
        {
            CreateMap<ShoppingCart, ShoppingCartDto>();
            CreateMap<LineItem, LineItemDto>();
        }
    }
}
