using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events;
using MediatR;

namespace CleanArchitecture.Application.Products.Commands.CreateProduct;
public class CreateProductCommand : IRequest<int>
{
    public int CategoryId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Img { get; set; }
    public int Price { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; }

}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken) 
    {
        var entity = new Product
        {
            CategoryId = request.CategoryId,
            Name = request.Name,
            Description = request.Description,
            Img = request.Img,
            Price = request.Price,
            Stock = request.Stock,
            minStock = request.MinStock
        };


        entity.DomainEvents.Add(new ProductCreatedEvent(entity));
        
        _context.Products.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}


