using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using ProjectTemplate.Application.Common.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTemplate.Infrastructure.Services.SignalR
{
    public class TodoHubService : ITodoHubService
    {
        private readonly IHubContext<TodoHub> _hubContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TodoHubService(IHubContext<TodoHub> hubContext, ICurrentUserService currentUserService, IHttpContextAccessor httpContextAccessor)
        {
            _hubContext = hubContext;
            _currentUserService = currentUserService;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task SendMessage(string type, object payload)
        {
            return _hubContext.Clients.All.SendAsync(type, _currentUserService.UserId, new { connectionId = GetClientId(), payload });
        }

        private string GetClientId()
        {
            var headers = _httpContextAccessor.HttpContext.Request.Headers;
            if (headers.ContainsKey("x-websocket-connectionid") || headers.ContainsKey("X-Websocket-ConnectionId"))
            {
                return headers.FirstOrDefault(x => x.Key == "X-WebSocket-ConnectionId" || x.Key == "x-websocket-connectionid").Value;
            }
            return string.Empty;
        }
    }
}
