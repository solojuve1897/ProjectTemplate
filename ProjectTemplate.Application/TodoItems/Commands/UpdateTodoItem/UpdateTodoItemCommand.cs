using ProjectTemplate.Application.Common.Exceptions;
using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;

namespace ProjectTemplate.Application.TodoItems.Commands.UpdateTodoItem
{
    public class UpdateTodoItemCommand : IRequest
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool Done { get; set; }
    }

    public class UpdateTodoItemCommandHandler : IRequestHandler<UpdateTodoItemCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoHubService _todoHubService;
        private readonly IMapper _mapper;

        public UpdateTodoItemCommandHandler(IApplicationDbContext context, ITodoHubService todoHubService, IMapper mapper)
        {
            _context = context;
            _todoHubService = todoHubService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.TodoItems.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(TodoItem), request.Id);
            }

            entity.Title = request.Title;
            entity.Done = request.Done;

            await _context.SaveChangesAsync(cancellationToken);

            var entityDto = _mapper.Map<TodoItemDto>(entity);
            await _todoHubService.SendMessage("updateListItem", entityDto);

            return Unit.Value;
        }
    }
}
