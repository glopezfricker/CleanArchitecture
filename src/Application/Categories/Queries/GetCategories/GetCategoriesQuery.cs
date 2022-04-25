using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Categories.Queries.GetCategories;
public class GetCategoriesQuery : IRequest<CategoriesVm>
{
}

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, CategoriesVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CategoriesVm> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        return new CategoriesVm
        {
            Categories = await _context.Categories
                .AsNoTracking()
                .ProjectTo<CategoriesDto>(_mapper.ConfigurationProvider)
                .OrderBy(n => n.Name)
                .ToListAsync(cancellationToken)
        };
    }
}
