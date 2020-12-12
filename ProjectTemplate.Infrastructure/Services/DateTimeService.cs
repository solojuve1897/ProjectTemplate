using ProjectTemplate.Application.Common.Interfaces;
using System;

namespace ProjectTemplate.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
