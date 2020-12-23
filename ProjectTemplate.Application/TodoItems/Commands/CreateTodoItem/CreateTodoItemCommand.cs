using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;
using AutoMapper;
using ProjectTemplate.Domain.Enums;

namespace ProjectTemplate.Application.TodoItems.Commands.CreateTodoItem
{
    public class CreateTodoItemCommand : IRequest<TodoItemDto>
    {
        public int ListId { get; set; }

        public string Title { get; set; }
        public PriorityLevel Priority { get; set; }

        public string Note { get; set; }
    }

    public class CreateTodoItemCommandHandler : IRequestHandler<CreateTodoItemCommand, TodoItemDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITodoHubService _todoHubService;

        public CreateTodoItemCommandHandler(IApplicationDbContext context, IMapper mapper, ITodoHubService todoHubService)
        {
            _context = context;
            _mapper = mapper;
            _todoHubService = todoHubService;
        }

        public async Task<TodoItemDto> Handle(CreateTodoItemCommand request, CancellationToken cancellationToken)
        {
            var entity = new TodoItem
            {
                ListId = request.ListId,
                Title = request.Title,
                Priority = request.Priority,
                Note = request.Note,
                Done = false
            };

            _context.TodoItems.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            var entityDto = _mapper.Map<TodoItemDto>(entity);
            await _todoHubService.SendMessage("addListItem", entityDto);

            return entityDto;
        }
    }
}
