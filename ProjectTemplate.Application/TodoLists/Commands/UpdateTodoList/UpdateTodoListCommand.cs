using ProjectTemplate.Application.Common.Exceptions;
using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ProjectTemplate.Application.TodoLists.Queries.GetTodos;
using Microsoft.EntityFrameworkCore;

namespace ProjectTemplate.Application.TodoLists.Commands.UpdateTodoList
{
    public class UpdateTodoListCommand : IRequest
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

    public class UpdateTodoListCommandHandler : IRequestHandler<UpdateTodoListCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITodoHubService _todoHubService;

        public UpdateTodoListCommandHandler(IApplicationDbContext context, IMapper mapper, ITodoHubService todoHubService)
        {
            _context = context;
            _mapper = mapper;
            _todoHubService = todoHubService;
        }

        public async Task<Unit> Handle(UpdateTodoListCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.TodoLists.Include(x => x.Items)
                                                 .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(TodoList), request.Id);
            }

            entity.Title = request.Title;

            await _context.SaveChangesAsync(cancellationToken);

            var entityDto = _mapper.Map<TodoListDto>(entity);
            await _todoHubService.SendMessage("updateList", entityDto);

            return Unit.Value;
        }
    }
}
