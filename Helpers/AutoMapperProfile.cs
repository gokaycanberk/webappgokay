using AutoMapper;
using WebAppGokay.Dtos;
using WebAppGokay.Entities;

namespace WebAppGokay.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}