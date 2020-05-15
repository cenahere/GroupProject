using Microsoft.AspNetCore.SignalR;

namespace MyGroupAPI.Models
{
    public class ChatHub : Hub
    {
        public async void refresh()
        {
            // await Clients.User( لو حابين يوزر محدد يوزع الخدمة)
            // الكل  , SendAsync لا انتظار ارسال فقط
            // refresh نفس اسم الدالة
            await Clients.All.SendAsync("refresh");
        }
        public async void count()
        {
            // تذهب الرسالة ولكن العداد لا يزيد لابد من عمل Invoke
            await Clients.All.SendAsync("count");
        }

    }
}
