using MyGroupAPI.Models;

namespace MyGroupAPI.Dtos
{
    public class UserClassForListDto
    {
        public int UserClassId { get; set; }
        public string UserClassName { get; set; }
        public string UserGroupName { get; set; }
    }
}