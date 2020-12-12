using ProjectTemplate.Domain.Common;
using ProjectTemplate.Domain.Enums;
using System;

namespace ProjectTemplate.Domain.Entities
{
    public class TodoItem : AuditableEntity
    {
        public int Id { get; set; }

        public TodoList List { get; set; }

        public int ListId { get; set; }

        public string Title { get; set; }

        public string Note { get; set; }

        public PriorityLevel Priority { get; set; }

        public DateTime? Reminder { get; set; }

        public bool Done { get; set; }
    }
}
