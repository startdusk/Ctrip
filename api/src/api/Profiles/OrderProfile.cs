using AutoMapper;
using Ctrip.API.Dtos;
using Ctrip.API.Models;

namespace Ctrip.API.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDto>()
                // 处理枚举到string的映射关系
                .ForMember(
                    dest => dest.State,
                    opt =>
                    {
                        opt.MapFrom(src => src.State.ToString());
                    }
                );
        }
    }
}