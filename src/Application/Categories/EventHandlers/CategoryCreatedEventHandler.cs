using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.Categories.EventHandlers;
public class CategoryCreatedEventHandler : INotificationHandler<DomainEventNotification<CategoryCreatedEvent>>
{
    private readonly ILogger<CategoryCreatedEventHandler> _logger;

    public CategoryCreatedEventHandler(ILogger<CategoryCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(DomainEventNotification<CategoryCreatedEvent> notification, CancellationToken cancellationToken)
    {
        var domainEvent = notification.DomainEvent;
        _logger.LogInformation("CleanArchitecture Domain Event: {DomainEvent}", domainEvent.GetType().Name);

        return Task.CompletedTask;
    }
}
