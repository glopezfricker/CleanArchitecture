using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Products.Queries.GetProducts;
public class GetProductsQuery : IRequest<ProductsVm>
{
}

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, ProductsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProductsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProductsVm> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        return new ProductsVm
        {
            Products = await _context.Products
                .AsNoTracking()
                .ProjectTo<ProductsDto>(_mapper.ConfigurationProvider)
                .OrderBy(n => n.Name)
                .ToListAsync(cancellationToken)
        };
    }
}
