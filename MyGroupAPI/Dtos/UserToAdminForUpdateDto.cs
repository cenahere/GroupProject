namespace MyGroupAPI.Dtos
{
    public class UserToAdminForUpdateDto
    {
        public string UserName { get; set; }
        public string UserPhone { get; set; }
        public string Password { get; set; }
        public string ArabicName { get; set; }
        public string GuardianName { get; set; }
        public string GuardianPhone { get; set; }
        public int UserClassId { get; set; }
        public int UserGroupId { get; set; }
    }
}