using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitecture.Infrastructure.Persistence.Configurations;
public class CategoryConfiguration :  IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.Ignore(e => e.DomainEvents);

        builder.Property(n => n.Name)
            .HasMaxLength(200)
            .IsRequired();
    }
}
