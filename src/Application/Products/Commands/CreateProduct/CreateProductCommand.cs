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
    public string? img { get; set; }
    public int price { get; set; }
    public int stock { get; set; }
    public int minStock { get; set; }

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
            Img = request.img,
            Price = request.price,
            Stock = request.stock,
            minStock = request.minStock
        };

        entity.DomainEvents.Add(new ProductCreatedEvent(entity));
        
        _context.Products.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}


