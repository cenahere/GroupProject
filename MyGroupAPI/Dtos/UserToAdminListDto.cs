namespace MyGroupAPI.Dtos
{
    public class UserToAdminListDto
    {
        public string UserName { get; set; }
        public int Id { get; set; }
        public string Password { get; set; }
        public string ArabicName { get; set; }
        public string UserPhone { get; set; }
        public string GuardianName { get; set; }
        public string GuardianPhone { get; set;}
        public string UserClassName { get; set; }
        public string UserVillageName { get; set; }
        public string UserCityName { get; set; }
        public string UserGroupName { get; set; }

        public int UserClassId { get; set; }
        public int UserGroupId { get; set; }
    }
}