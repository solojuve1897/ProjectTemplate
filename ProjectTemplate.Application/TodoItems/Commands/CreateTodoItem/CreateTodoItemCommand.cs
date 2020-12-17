using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;
using AutoMapper;

namespace ProjectTemplate.Application.TodoItems.Commands.CreateTodoItem
{
    public class CreateTodoItemCommand : IRequest<TodoItemDto>
    {
        public int ListId { get; set; }

        public string Title { get; set; }
    }

    public class CreateTodoItemCommandHandler : IRequestHandler<CreateTodoItemCommand, TodoItemDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateTodoItemCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TodoItemDto> Handle(CreateTodoItemCommand request, CancellationToken cancellationToken)
        {
            var entity = new TodoItem
            {
                ListId = request.ListId,
                Title = request.Title,
                Done = false
            };

            _context.TodoItems.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<TodoItemDto>(entity);
        }
    }
}
