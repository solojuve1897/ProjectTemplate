using ProjectTemplate.Application.Common.Mappings;
using ProjectTemplate.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ProjectTemplate.Application.TodoLists.Queries.GetTodos
{
    public class TodoListDto : IMapFrom<TodoList>
    {
        public TodoListDto()
        {
            Items = new List<TodoItemDto>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime? LastModified { get; set; }

        public IList<TodoItemDto> Items { get; set; }
    }
}
