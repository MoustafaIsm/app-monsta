using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private HttpClient _httpClient;

        public AppController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<string> GetAppDetails (string store, string appId, string country)
        {
            string result = "";
            // Get the Auth header
            var req = Request;
            var headers = req.Headers;
            string key = headers["Authorization"].ToString().Split(" ")[1];
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", key);

            Uri url = new("https://api.appmonsta.com/v1/stores/" + store + "/details/" + appId + ".json?country=" + country);
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                result = "No result";
            }
            return result;
        }

        [Route("[action]/")]
        [HttpGet]
        public async Task<string> getPublishers (string store, string date)
        {
            string result = "";
            // Get the Auth header
            var req = Request;
            var headers = req.Headers;
            string key = headers["Authorization"].ToString().Split(" ")[1];
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", key);

            Uri url = new("https://api.appmonsta.com/v1/stores/" + store + "/publishers.json?date=" + date);
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                result = "No result.";
            }
            return result;
        }
    }
}
