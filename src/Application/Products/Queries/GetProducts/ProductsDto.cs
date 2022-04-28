using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Products.Queries.GetProducts;
public class ProductsDto : IMapFrom<Product>
{
    public int Id { get; set; }
        
    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Img { get; set; }

    public int Price { get; set; }
    
    public int Stock { get; set; }
    
    public int MinStock { get; set; }       
}