using System.Linq;
using AutoMapper;
using MyGroupAPI.Dtos;
using MyGroupAPI.Models;

namespace MyGroupAPI.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles () {
            CreateMap<UserForRegisterDto, User> ();
            CreateMap<User, UserForLoginDto> ();
            CreateMap<User, UserForListDto> ()
                .ForMember (dest => dest.PhotoUrl, opt => { opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url); })
                .ForMember (dest => dest.UserVillageName, opt => { opt.MapFrom (src => src.UserVillage.UserVillageName) ;})
                .ForMember (dest => dest.UserCityName, opt => { opt.MapFrom (src => src.UserCity.UserCityName); })
                .ForMember (dest => dest.UserGovernorateName, opt => { opt.MapFrom (src => src.UserGovernorate.UserGovernorateName); })
                .ForMember (dest => dest.UserCountryName, opt => { opt.MapFrom (src => src.UserCountry.UserCountryName); })
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.UserClass.UserClassName); })
                .ForMember (dest => dest.UserGroupName, opt => { opt.MapFrom (src => src.UserGroup.UserGroupName); });

                
                CreateMap<User, UserForDetailsDto> ()
                .ForMember (dest => dest.PhotoUrl, opt => { opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url); })
                .ForMember (dest => dest.UserVillageName, opt => { opt.MapFrom (src => src.UserVillage.UserVillageName) ;})
                .ForMember (dest => dest.UserCityName, opt => { opt.MapFrom (src => src.UserCity.UserCityName); })
                .ForMember (dest => dest.UserGovernorateName, opt => { opt.MapFrom (src => src.UserGovernorate.UserGovernorateName); })
                .ForMember (dest => dest.UserCountryName, opt => { opt.MapFrom (src => src.UserCountry.UserCountryName); })
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.UserClass.UserClassName); })
                .ForMember (dest => dest.UserGroupName, opt => { opt.MapFrom (src => src.UserGroup.UserGroupName); });

            CreateMap<User, UserToAdminForDetailsDto>()
                .ForMember (dest => dest.PhotoUrl, opt => { opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url); })
                .ForMember (dest => dest.UserVillageName, opt => { opt.MapFrom (src => src.UserVillage.UserVillageName) ;})
                .ForMember (dest => dest.UserCityName, opt => { opt.MapFrom (src => src.UserCity.UserCityName); })
                .ForMember (dest => dest.UserGovernorateName, opt => { opt.MapFrom (src => src.UserGovernorate.UserGovernorateName); })
                .ForMember (dest => dest.UserCountryName, opt => { opt.MapFrom (src => src.UserCountry.UserCountryName); })
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.UserClass.UserClassName); })
                .ForMember (dest => dest.UserGroupName, opt => { opt.MapFrom (src => src.UserGroup.UserGroupName); });

            CreateMap<Photo, PhotoForDetailsDto> ();
            CreateMap<UserForUpdateDto, User> ();

            CreateMap<Photo, PhotoToReturnDto> ();
            CreateMap<PhotoToCreateDto, Photo> ();

            CreateMap<MessageForCreationDto, Message> ().ReverseMap ();
            CreateMap<Message, MessageToReturnDto> ()
                .ForMember (dest => dest.SenderPhotoUrl, opt => { opt.MapFrom (src => src.Sender.Photos.FirstOrDefault (p => p.IsMain).Url); })
                .ForMember (dest => dest.RecipientPhotoUrl, opt => { opt.MapFrom (src => src.Recipient.Photos.FirstOrDefault (p => p.IsMain).Url); });
            CreateMap<Payment, PaymentForReturnDto> ();

            // Admin panel Dtos
            // userClass
            CreateMap<UserClass, UserClassForListDto> ()
                .ForMember(dest=>dest.UserGroupName, opt=>{opt.MapFrom(src=>src.UserGroups.FirstOrDefault(x=>x.UserGroupName != null).UserGroupName);});
            CreateMap<UserClassForCreateDto, UserClass> ();
            CreateMap<UserClassForUpdateDto, UserClass> ();

            // User Address
            // UserCity
            CreateMap<CityForUpdateDto, UserCity> ();
            CreateMap<CityForInsertDto, UserCity> ();
            // user Village
            CreateMap<UserVillageToCreateDto, UserVillage> ();
            CreateMap<UserVillageToUpdateDto, UserVillage> ();
            // User Governorate
            CreateMap<UserGovernorateToCreateDto, UserGovernorate> ();
            CreateMap<UserGovernorateToUpdateDto, UserGovernorate> ();
            // User Country
            CreateMap<UserCountryToCreateDto, UserCountry> ();
            CreateMap<UserCountryToUpdateDto, UserCountry> ();
            // userToAdmin
            CreateMap<User , UserToAdminListDto>()
                .ForMember (dest => dest.UserVillageName, opt => { opt.MapFrom (src => src.UserVillage.UserVillageName) ;})
                .ForMember (dest => dest.UserCityName, opt => { opt.MapFrom (src => src.UserCity.UserCityName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.UserClass.UserClassName); });


            CreateMap<UserToAdminForCreateDto,User>();
            CreateMap<UserToAdminForUpdateDto,User>();
            // usergroup
            CreateMap<UserGroupToCrateDto,UserGroup>();
            CreateMap<UserGroup,UserGroupToRetrunDto>();
            // userAttend
            CreateMap<UserAttendToCreateDto,UserAttend>();
            CreateMap<UserAttend,UserAttendToReturnDto>()
                .ForMember (dest => dest.ArabicName, opt => { opt.MapFrom (src => src.User.ArabicName); })
                .ForMember (dest => dest.GuardianName, opt => { opt.MapFrom (src => src.User.GuardianName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.User.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.User.UserClass.UserClassName); });

            CreateMap<UserAttend,UserAttendToListDto>()
                .ForMember (dest => dest.ArabicName, opt => { opt.MapFrom (src => src.User.ArabicName); })
                .ForMember (dest => dest.GuardianName, opt => { opt.MapFrom (src => src.User.GuardianName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.User.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.User.UserClass.UserClassName); });
            CreateMap<UserAttend,UserAttendDetailsDto>()
                .ForMember (dest => dest.ArabicName, opt => { opt.MapFrom (src => src.User.ArabicName); })
                .ForMember (dest => dest.GuardianName, opt => { opt.MapFrom (src => src.User.GuardianName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.User.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.User.UserClass.UserClassName); });
             CreateMap<UserAttendToUpdateDto,UserAttend>();
            //UserExam
            CreateMap<UserExamToCreateDto,UserExam>();
            CreateMap<UserExamToUpdateDto,UserExam>();

            CreateMap<UserExam,UserExamToReturnDto>();
            CreateMap<UserExam,UserExamToListDto>()
                .ForMember (dest => dest.ArabicName, opt => { opt.MapFrom (src => src.User.ArabicName); })
                .ForMember (dest => dest.GuardianName, opt => { opt.MapFrom (src => src.User.GuardianName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.User.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.User.UserClass.UserClassName); });
            //UserPay
            CreateMap<UserPayToCreateDto,UserPay>();
            CreateMap<UserPay,UserPayToReturnDto>();
            CreateMap<UserPay,UserPayToListDto>()
                .ForMember (dest => dest.ArabicName, opt => { opt.MapFrom (src => src.User.ArabicName); })
                .ForMember (dest => dest.GuardianName, opt => { opt.MapFrom (src => src.User.GuardianName); })
                .ForMember (dest => dest.UserGroupName, opt=> { opt.MapFrom (src=>src.User.UserGroup.UserGroupName);})
                .ForMember (dest => dest.UserClassName, opt => { opt.MapFrom (src => src.User.UserClass.UserClassName); });
            CreateMap<UserPayToUpdateDto,UserPay>();


        }
    }
}