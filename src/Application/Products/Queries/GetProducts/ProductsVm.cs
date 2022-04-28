namespace CleanArchitecture.Application.Products.Queries.GetProducts;
public class ProductsVm
{
    public IList<ProductsDto> Products { get; set; } = new List<ProductsDto>();
}

