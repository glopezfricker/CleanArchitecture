using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class Product : AuditableEntity, IHasDomainEvent { 
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public int Price { get; set; }

    public int Stock { get; set; }
        
    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
}
