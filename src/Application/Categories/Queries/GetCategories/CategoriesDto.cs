using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Categories.Queries.GetCategories;
public class CategoriesDto : IMapFrom<Category>
{
    //public CategoriesDto()
    //{
    //    Products = new List<ProductDto>();
    //}

    public int Id { get; set; }

    public string? Name {  get; set; }

    //public IList<ProductDto> Products { get; set; }
}
