using CleanArchitecture.Application.Categories.Commands.CreateCategory;
using CleanArchitecture.Application.Categories.Commands.DeleteCategory;
using CleanArchitecture.Application.Categories.Commands.UpdateCategory;
using CleanArchitecture.Application.Categories.Queries.GetCategories;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class CategoryController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<CategoriesVm>> Get()
    {
        return await Mediator.Send(new GetCategoriesQuery());
    }
    
    //[HttpGet]
    //public async Task<ActionResult<CategoriesVm>> Get
    //{
    //    return await Mediator.Send(new GetCategoriesQuery());
    //}

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateCategoryCommand command)
    {
        return await Mediator.Send(command);
    }
}
