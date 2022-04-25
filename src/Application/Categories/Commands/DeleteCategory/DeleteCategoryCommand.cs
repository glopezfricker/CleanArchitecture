using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events;
using MediatR;

namespace CleanArchitecture.Application.Categories.Commands.DeleteCategory;
public class DeleteCategoryCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var entity =  await _context.Categories
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if(entity == null)
        {
            throw new NotFoundException(nameof(Category), request.Id);
        }

        _context.Categories.Remove(entity);

        entity.DomainEvents.Add(new CategoryDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
