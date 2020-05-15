using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;

namespace MyGroupAPI.Data {
    public class GroupRepository : IGroupRepository {
        private readonly DataContext _context;
        public GroupRepository (DataContext context) {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }

        public async Task<User> GetUser (int id) {
            var user = await _context.Users.Include (x => x.Photos).Include(uc=>uc.UserClass)
                        .Include(v=>v.UserVillage).Include(c=>c.UserCity)
                        .Include(g=>g.UserGovernorate).Include(co=>co.UserCountry)
                        .Include(p=>p.UserPays).Include(e=>e.UserExams).Include(co=>co.UserGroup)
                        .Include(a=>a.UserAttends).FirstOrDefaultAsync (x => x.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers (UserParams userParams) {
            var users = _context.Users.Include (p => p.Photos).Include(uc=>uc.UserClass)
                        .Include(v=>v.UserVillage).Include(c=>c.UserCity)
                        .Include(g=>g.UserGovernorate).Include(co=>co.UserCountry)
                        .Include(p=>p.UserPays).Include(e=>e.UserExams).Include(co=>co.UserGroup)
                        .Include(a=>a.UserAttends).OrderByDescending (u => u.ArabicName).AsQueryable();
            users = users.Where (u => u.Id != userParams.UserId);
            users = users.Where (u => u.Gender == userParams.Gender);
            users = users.Where(u => u.UserVillage.UserVillageName == userParams.UserVillageName);
            users = users.Where(u => u.UserClass.UserClassName == userParams.UserClassName);
            
            if (!string.IsNullOrEmpty (userParams.OrderBy)) {
                switch (userParams.OrderBy) {
                    case "created":
                        users = users.OrderByDescending (u => u.Created);
                        break;
                    case "lastActive":
                        users = users.OrderByDescending (u => u.LastActive);
                        break;
                    default:
                        users = users.OrderBy (u => u.ArabicName);
                        break;
                }
            }
            return await PagedList<User>.CreateAsync (users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        public async Task<Photo> GetPhoto (int id) {
            var photo = await _context.Photo.FirstOrDefaultAsync (p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser (int userId) {
            return await _context.Photo.Where (u => u.UserId == userId).FirstOrDefaultAsync (p => p.IsMain);
        }

        public async Task<Message> GetMessage (int id) {
            return await _context.Messages.FirstOrDefaultAsync (m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser (MessageParams messageParams) {
            // كل الرسائل الصادرة والوارده     
            var messages = _context.Messages.Include (m => m.Sender).ThenInclude (u => u.Photos)
                .Include (m => m.Recipient).ThenInclude (u => u.Photos).AsQueryable ();
            switch (messageParams.MessageType) {
                case "Inbox": // الرسائل المستقبلة وغير محذوفة
                    messages = messages.Where (m => m.RecipientId == messageParams.UserId && m.RecipientDeleted == false);
                    break;
                case "Outbox": // الرسله بالمرسل وغير محذوفة
                    messages = messages.Where (m => m.SenderId == messageParams.UserId && m.SenderDeleted == false);
                    break;
                default: // الرسائل غير المقروءة وغير محذوفه
                    messages = messages.Where (m => m.RecipientId == messageParams.UserId && m.RecipientDeleted == false && m.IsRead == false);
                    break;
            }
            //  ترتيب الرسائل بالاحداث
            messages = messages.OrderByDescending (m => m.MessageSend);
            // تعود بالرسائل مفلترة وبالثلاثة انواع 
            return await PagedList<Message>.CreateAsync (messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetConverstion (int userId, int recipientId) {
            var messages = await _context.Messages.Include (m => m.Sender).ThenInclude (u => u.Photos)
                .Include (m => m.Recipient).ThenInclude (u => u.Photos).Where (m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId || m.RecipientId == recipientId && m.SenderDeleted == false && m.SenderId == userId).OrderByDescending (m => m.MessageSend).ToListAsync ();
            return messages;
        }

        public async Task<int> GetUreadMessagesForUser (int userId) {
            var messages = await _context.Messages.Where (m => m.IsRead == false && m.RecipientId == userId).ToListAsync ();
            var count = messages.Count ();
            return count;
        }

        public async Task<IEnumerable<Payment>> GetAllPayments () {
            var payments = await _context.Payment.ToListAsync ();
            return payments;
        }

       
        public async Task<IEnumerable<UserCity>> GetUserCities()
        {
            var userCities = await _context.UserCity.Include(x=>x.Users).ToListAsync();
            return userCities;
        }

        public async Task<UserCity> GetUserCity(int userCityId)
        {
            var userCity = await _context.UserCity.Include(x=>x.Users).FirstOrDefaultAsync(x=>x.UserCityId==userCityId);
            return userCity;
        }
        // Role Mehtods
        public async Task<UserRoles> GetUserRoles (int userId, int roleId) {
            return await _context.UserRole.FirstOrDefaultAsync (uc => uc.UserId == userId && uc.RoleId == roleId);
        }
        // User Class Method
public async Task<IEnumerable<UserClass>> GetUserAllClasses()
{
    var userClasses = await _context.UserClass.Include(us=>us.Users).ToListAsync();
    return userClasses;
}

public async Task<UserClass> GetUserClass(int userClassId)
{
    var userClass = await _context.UserClass.Include(us=>us.Users).Include(x=>x.UserGroups).FirstOrDefaultAsync(uc=>uc.UserClassId == userClassId);
    return userClass;
}

        public async Task<IEnumerable<UserVillage>> GetUserVillages()
        {
            var userVillages = await _context.UserVillage.Include(v=>v.Users).ToListAsync();
            return userVillages;
        }

        public async Task<UserVillage> GetUserVillage(int UserVillageId)
        {
            var userVillage = await _context.UserVillage.Include(v=>v.Users).FirstOrDefaultAsync(v=>v.UserVillageId==UserVillageId);
            return userVillage;
        }

        public async Task<IEnumerable<UserGovernorate>> GetUserGovernorates()
        {
            var userGovernorates = await _context.UserGovernorate.Include(g=>g.Users).ToListAsync();
            return userGovernorates; 
        }

        public async Task<UserGovernorate> GetUserGovernorate(int userGovernorateId)
        {
            var userGovernorate = await _context.UserGovernorate.Include(g=>g.Users).FirstOrDefaultAsync(g=>g.UserGovernorateId == userGovernorateId);
            return  userGovernorate;
        }

        public async Task<IEnumerable<UserCountry>> GetUserCountries()
        {
           var userCountries = await _context.UserCountry.Include(c=>c.Users).ToListAsync();
           return userCountries;
        }

        public async Task<UserCountry> GetUserCountry(int userCountryId)
        {
            var userCountry = await _context.UserCountry.Include(c=>c.Users).FirstOrDefaultAsync(c=>c.UserCountryId == userCountryId);
            return userCountry;
        }

       

        public async Task<IEnumerable<UserGroup>> UserGroups()
        {
            var userGroups = await _context.UserGroup.Include(ux => ux.Users).OrderBy(x=>x.UserGroupName).ToListAsync();
            return userGroups;
        }

        public async Task<UserGroup> UserGroup(int userGroupId)
        {
            var userGroup = await _context.UserGroup.Include(ux => ux.Users)
                                                    .FirstOrDefaultAsync(x => x.UserGroupId == userGroupId);
                                                    
            return userGroup;
        }

        public async Task<UserAttend> GetUserAttend(int UserAttendId)
        {
           var userAttend = await _context.UserAttend.Include(x=>x.User).OrderByDescending(x=>x.UserAttendId).FirstOrDefaultAsync(x=>x.UserAttendId==UserAttendId);
           return userAttend;
        }

public async Task<IEnumerable<UserAttend>> GetUsersAttend()
{
    var userAttends = await _context.UserAttend.Include(x=>x.User).ThenInclude(x=>x.UserGroup).ThenInclude(x=>x.UserClass).OrderByDescending(x=>x.UserAttendId).ToListAsync();
    return userAttends;

}

        public async Task<UserExam> GetUserExam(int userExamId)
        {
            var userExam =  await _context.UserExam.Include(x=>x.User).ThenInclude(x=>x.UserGroup).ThenInclude(x=>x.UserClass).FirstOrDefaultAsync(x=>x.UserExamId==userExamId);
            return userExam;
        }

        public async Task<IEnumerable<UserExam>> GetUsersExams()
        {
            var userExams = await _context.UserExam.Include(x=>x.User).ThenInclude(x=>x.UserGroup).Include(x=>x.User).ThenInclude(x=>x.UserClass).OrderByDescending(x=>x.UserExamId).ToListAsync();
            return userExams;
        }

        public async Task<UserPay> GetUserPay(int userPayId)
        {
            var userPay =  await _context.UserPay.Include(x=>x.User).ThenInclude(x=>x.UserGroup).ThenInclude(x=>x.UserClass).FirstOrDefaultAsync(x=>x.UserPayId==userPayId);
            return userPay;        
        }

        public async Task<IEnumerable<UserPay>> GetUsersPay()
        {
            var userPays =  await _context.UserPay.Include(x=>x.User).ThenInclude(x=>x.UserGroup).ThenInclude(x=>x.UserClass).OrderByDescending(x=>x.UserPayId).ToListAsync();
            return userPays;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _context.User.Include (x => x.Photos).Include(uc=>uc.UserClass)
                        .Include(v=>v.UserVillage).Include(c=>c.UserCity)
                        .Include(g=>g.UserGovernorate).Include(co=>co.UserCountry)
                        .Include(p=>p.UserPays).Include(e=>e.UserExams)
                        .Include(a=>a.UserAttends).Include(u=>u.UserGroup).OrderByDescending(x=>x.Id).ToListAsync();
            return users;
        }

public async Task<PagedList<User>> GetUsersToAdmin(AdminParams adminParams)
{
    var users = _context.Users.Include (p => p.Photos).Include(uc=>uc.UserClass)
                .Include(v=>v.UserVillage).Include(c=>c.UserCity)
                .Include(g=>g.UserGovernorate).Include(co=>co.UserCountry)
                .Include(p=>p.UserPays).Include(e=>e.UserExams).Include(co=>co.UserGroup)
                .Include(a=>a.UserAttends).OrderByDescending (u => u.ArabicName).AsQueryable();
    users = users.Where (u => u.Id != adminParams.UserId);
    users = users.Where (u => u.Gender == adminParams.Gender);
    users = users.Where(u => u.UserGroup.UserGroupName == adminParams.UserGroupName);
    users = users.Where(u => u.UserClass.UserClassName == adminParams.UserClassName);
    

    return await PagedList<User>.CreateAsync (users, adminParams.PageNumber, adminParams.PageSize);
}

public async Task<User> GetUserToAdmin(int id)
{
    var user = await _context.Users.Include (x => x.Photos).Include(uc=>uc.UserClass)
                .Include(v=>v.UserVillage).Include(c=>c.UserCity)
                .Include(g=>g.UserGovernorate).Include(co=>co.UserCountry)
                .Include(p=>p.UserPays).Include(e=>e.UserExams).Include(co=>co.UserGroup)
                .Include(a=>a.UserAttends).FirstOrDefaultAsync (x => x.Id == id);
    return user;
}
}

}