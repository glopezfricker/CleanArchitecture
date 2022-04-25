using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Application.Common.Models;
using MediatR;

namespace CleanArchitecture.Application.Products.Queries.GetProductsWithPagination;
public class GetProductsWithPaginationQuery : IRequest<PaginatedList<ProductBriefDto>>
{
    public int CategoryId { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class GetProductsWithPaginationQueryHandler : IRequestHandler<GetProductsWithPaginationQuery, PaginatedList<ProductBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProductsWithPaginationQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    {
        _context = dbContext;   
        _mapper = mapper;
    }

    public async Task<PaginatedList<ProductBriefDto>> Handle(GetProductsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Products
            .Where(p => p.CategoryId == request.CategoryId)
            .OrderBy(p => p.Name)
            .ProjectTo<ProductBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
