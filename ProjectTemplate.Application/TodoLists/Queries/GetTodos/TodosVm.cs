using System.Collections.Generic;

namespace ProjectTemplate.Application.TodoLists.Queries.GetTodos
{
    public class TodosVm
    {
        public IDictionary<int, string> PriorityLevels { get; set; }

        public IList<TodoListDto> Lists { get; set; }
    }
}
