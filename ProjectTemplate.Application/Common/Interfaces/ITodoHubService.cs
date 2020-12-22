using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectTemplate.Application.Common.Interfaces
{
    public interface ITodoHubService
    {
        Task SendMessage(string type, object payload);
    }
}
