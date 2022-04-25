namespace CleanArchitecture.Application.Categories.Queries.GetCategories;
public class CategoriesVm
{
    public IList<CategoriesDto> Categories { get; set; } = new List<CategoriesDto>();
}
