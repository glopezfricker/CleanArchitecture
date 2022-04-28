using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Products.Queries.GetProductsWithPagination;
public class ProductBriefDto : IMapFrom<Product>
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string? Name { get; set; }
 }
