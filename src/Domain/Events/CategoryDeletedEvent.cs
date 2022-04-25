using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Events;
public class CategoryDeletedEvent : DomainEvent
{
    public CategoryDeletedEvent(Category category)
    {
        cat = category;
    }

    public Category cat { get;}
}
