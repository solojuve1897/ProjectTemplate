using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;

namespace ProjectTemplate.Application.TodoLists.Commands.CreateTodoList
{
    public class CreateTodoListCommand : IRequest<TodoListDto>
    {
        public string Title { get; set; }
    }

    public class CreateTodoListCommandHandler : IRequestHandler<CreateTodoListCommand, TodoListDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITodoHubService _todoHubService;

        public CreateTodoListCommandHandler(IApplicationDbContext context, IMapper mapper, ITodoHubService todoHubService)
        {
            _context = context;
            _mapper = mapper;
            _todoHubService = todoHubService;
        }

        public async Task<TodoListDto> Handle(CreateTodoListCommand request, CancellationToken cancellationToken)
        {
            var entity = new TodoList();
            entity.Title = request.Title;

            _context.TodoLists.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            var entityDto = _mapper.Map<TodoListDto>(entity);
            await _todoHubService.SendMessage("addList", entityDto);

            return entityDto;
        }
    }
}
