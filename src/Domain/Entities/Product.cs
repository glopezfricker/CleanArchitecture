namespace CleanArchitecture.Domain.Entities;
public class Product : AuditableEntity, IHasDomainEvent { 
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Img { get; set; }

    public int Price { get; set; }

    public int Stock { get; set; }
        
    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
}
