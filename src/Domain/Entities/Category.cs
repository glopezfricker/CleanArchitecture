using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class Category : AuditableEntity, IHasDomainEvent
{    public int Id {get; set;}
    public string? Name {get; set;}
    public string? Description {get; set;}
    public string? Image { get; set;}
    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
}
