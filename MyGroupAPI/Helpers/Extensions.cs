using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MyGroupAPI.Helpers {
    public static class Extensions {
        // httpresponse يمثل الاب
        public static void AddApplicationError (this HttpResponse response, string message) {
            // نص الرسالة
            response.Headers.Add ("Application-Error", message);
            // عرض الرسالة
            response.Headers.Add ("Access-Control-Expose-Headers", "Application-Error");
            // هذا هو الهام ويسمح لاي origin بالدخول فلا يظهر خطا ال cors
            response.Headers.Add ("Access-Control-Allow-Origin", "*");
        }

                public static void AddPagination (this HttpResponse response , int currentPage, int itemPerPage , int totalItmes , int totalPages)
        {
           var paginationHeader = new PginationHeader(currentPage,itemPerPage,totalItmes,totalPages);
            // الانجولر يتعامل مع الراجع علي انو camelCase لذلك وجب التعديل لذلك 
           var camelCaseFormatter= new JsonSerializerSettings();
           camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
           response.Headers.Add("Pagination",JsonConvert.SerializeObject(paginationHeader,camelCaseFormatter));
           response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }


    }
}