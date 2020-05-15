using System.Collections.Generic;
using System.Threading.Tasks;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Data
{
    public interface IGroupRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<PagedList<User>> GetUsersToAdmin (AdminParams adminParams);
        Task<User> GetUserToAdmin(int id);

        
         Task<User> GetUser(int id);
         Task<bool> SaveAll();

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetConverstion(int userId , int reciptientId);
        Task<int> GetUreadMessagesForUser(int userId);


        // Admin Methods
        // Role methods
        Task<UserRoles> GetUserRoles(int userId,int roleId);
        // Payment Methods
        Task<IEnumerable<Payment>> GetAllPayments();
        // User Class Method
Task<IEnumerable<UserClass>> GetUserAllClasses();
Task<UserClass> GetUserClass(int userClassId);
        // User Address Methods
        // UserCity
         Task<IEnumerable<UserCity>> GetUserCities();
         Task<UserCity> GetUserCity(int userCityId);
        // UserVillage
        Task<IEnumerable<UserVillage>> GetUserVillages();
        Task<UserVillage> GetUserVillage(int UserVillageId);

        // UserGovernorate
        Task<IEnumerable<UserGovernorate>> GetUserGovernorates();
        Task<UserGovernorate> GetUserGovernorate(int userGovernorate);
        // User Country
        Task<IEnumerable<UserCountry>> GetUserCountries();
        Task<UserCountry> GetUserCountry(int userCountryId);
        // control users
        //  Task<IEnumerable<User>> GetUsersToAdmin();
        //  Task<User> GetUserToAdmin(int id);

        // UserGroup
        Task<IEnumerable<UserGroup>> UserGroups();
        Task<UserGroup> UserGroup(int userGroupId);

        // UserAttend
        Task<UserAttend> GetUserAttend(int userAttentId);
        Task<IEnumerable<UserAttend>> GetUsersAttend();

        // UserExam
        Task<UserExam> GetUserExam(int userExamId);
        Task<IEnumerable<UserExam>> GetUsersExams();
        //UserPay
        Task<UserPay> GetUserPay(int userPayId);
        Task<IEnumerable<UserPay>> GetUsersPay();

        // getAllUsers
        Task<IEnumerable<User>> GetAllUsers();
        

        

    }
}