using ProjectTemplate.Application.Common.Exceptions;
using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using ProjectTemplate.Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;

namespace ProjectTemplate.Application.TodoItems.Commands.UpdateTodoItemDetail
{
    public class UpdateTodoItemDetailCommand : IRequest
    {
        public int Id { get; set; }

        public int ListId { get; set; }

        public string Title { get; set; }

        public PriorityLevel Priority { get; set; }

        public string Note { get; set; }
    }

    public class UpdateTodoItemDetailCommandHandler : IRequestHandler<UpdateTodoItemDetailCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoHubService _todoHubService;
        private readonly IMapper _mapper;

        public UpdateTodoItemDetailCommandHandler(IApplicationDbContext context, ITodoHubService todoHubService, IMapper mapper)
        {
            _context = context;
            _todoHubService = todoHubService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateTodoItemDetailCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.TodoItems.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(TodoItem), request.Id);
            }

            entity.ListId = request.ListId;
            entity.Title = request.Title;
            entity.Priority = request.Priority;
            entity.Note = request.Note;

            await _context.SaveChangesAsync(cancellationToken);

            var entityDto = _mapper.Map<TodoItemDto>(entity);
            await _todoHubService.SendMessage("updateListItem", entityDto);

            return Unit.Value;
        }
    }
}
