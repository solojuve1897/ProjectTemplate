using AutoMapper;
using AutoMapper.QueryableExtensions;
using ProjectTemplate.Application.Common.Interfaces;
using ProjectTemplate.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectTemplate.Application.TodoLists.Queries.GetTodos
{
    public class GetTodosQuery : IRequest<TodosVm>
    {
    }

    public class GetTodosQueryHandler : IRequestHandler<GetTodosQuery, TodosVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetTodosQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TodosVm> Handle(GetTodosQuery request, CancellationToken cancellationToken)
        {
            return new TodosVm
            {
                PriorityLevels = Enum.GetValues(typeof(PriorityLevel))
                    .Cast<PriorityLevel>()
                    .Select(p => new { Value = (int)p, Name = p.ToString() })
                    .ToDictionary(x => x.Value, x => x.Name),

                Lists = await _context.TodoLists
                    .AsNoTracking()
                    .ProjectTo<TodoListDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(t => t.LastModified)
                    .ToListAsync(cancellationToken)
            };
        }
    }
}
