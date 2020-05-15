using System.ComponentModel.DataAnnotations;

namespace MyGroupAPI.Dtos
{
    public class CityForInsertDto
    {
        [Required]
        public string UserCityName { get; set; }
    }
}