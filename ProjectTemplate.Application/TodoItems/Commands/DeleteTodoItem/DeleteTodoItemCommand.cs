using ProjectTemplate.Application.Common.Exceptions;
using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectTemplate.Application.TodoItems.Commands.DeleteTodoItem
{
    public class DeleteTodoItemCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteTodoItemCommandHandler : IRequestHandler<DeleteTodoItemCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoHubService _todoHubService;

        public DeleteTodoItemCommandHandler(IApplicationDbContext context, ITodoHubService todoHubService)
        {
            _context = context;
            _todoHubService = todoHubService;
        }

        public async Task<Unit> Handle(DeleteTodoItemCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.TodoItems.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(TodoItem), request.Id);
            }

            var payload = new { entity.ListId, entity.Id };

            _context.TodoItems.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);
            await _todoHubService.SendMessage("deleteListItem", payload);

            return Unit.Value;
        }
    }
}
