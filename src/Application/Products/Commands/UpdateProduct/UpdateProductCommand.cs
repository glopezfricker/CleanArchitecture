using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Products.Commands.UpdateProduct;
public class UpdateProductCommand : IRequest
{
    public int Id { get; set; }
    
    public int CategoryId { get; set; }    
    
    public string? Name { get; set; }
    
    public string? Description { get; set; }
    
    public string? Img { get; set; }
    
    public int Price { get; set; }
    
    public int Stock { get; set; }
    
    public int MinStock { get; set; }
    
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IApplicationDbContext _context;
    public UpdateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Products
            .FindAsync(new object[] { request.Id }, cancellationToken);
        
        if (entity == null)
        {
            throw new NotFoundException(nameof(Product), request.Id);
        }

        entity.CategoryId = request.CategoryId;

        entity.Name = request.Name;
        
        entity.Description = request.Description;

        entity.Img = request.Img;
        
        entity.Price = request.Price;            
        
        entity.Stock = request.Stock;

        entity.minStock =   request.MinStock;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}