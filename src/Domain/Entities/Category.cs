namespace CleanArchitecture.Domain.Entities;
public class Category : AuditableEntity, IHasDomainEvent
{    
    public int Id {get; set;}
    public string? Name {get; set;}
    public string? Description {get; set;}
    public string? Img { get; set;}
    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    
    public IList<Product> Items { get; private set; } = new List<Product>();
}
