using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
 

namespace CleanArchitecture.Application.Categories.Commands.UpdateCategory;
public class UpdateCategoryCommand : IRequest
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }

    public string? Img { get; set; }
}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Categories
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Category), request.Id);
        }

        entity.Name = request.Name;
        entity.Description = request.Description;
        entity.Img = request.Img;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
