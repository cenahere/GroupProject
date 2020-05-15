namespace MyGroupAPI.Helpers
{
public class AdminParams
{
    private const int MaxPageSize=50;
    public int PageNumber {get;set;}=1;
    private int pageSize;
    public int PageSize
    {
        get { return pageSize;}
        set { pageSize = (value>MaxPageSize)?MaxPageSize:value;}
    }
    public int UserId { get; set; }
    public string Gender { get; set; }
    public string UserClassName { get; set; }
    public string UserGroupName { get; set; }
}
}