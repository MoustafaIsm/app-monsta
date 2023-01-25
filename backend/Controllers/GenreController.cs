using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Net;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private HttpClient _httpClient;

        public GenreController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<string> GetGenres (string store, string country, string date)
        {
            string result = "";
            // Get the Auth header
            var req = Request;
            var headers = req.Headers;
            string key = headers["Authorization"].ToString().Split(" ")[1];
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", key);
            
            Uri url = new("https://api.appmonsta.com/v1/stores/" + store + "/rankings/aggregate.json?country=" + country + "&date=" + date);
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

        [Route("[action]/getSpecificNames")]
        [HttpGet]
        public async Task<string> GetSpecificNames (string store, string date)
        {
            string result = "";
            // Get the Auth header
            var req = Request;
            var headers = req.Headers;
            string key = headers["Authorization"].ToString().Split(" ")[1];
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", key);

            Uri url = new("https://api.appmonsta.com/v1/stores/" + store + "/rankings/genres.json?date=" + date);
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
