using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events;
public class ProductCreatedEvent : DomainEvent
{
    public ProductCreatedEvent(Product product)
    {
        product = product;
    }
    public Product prod { get; }
}
