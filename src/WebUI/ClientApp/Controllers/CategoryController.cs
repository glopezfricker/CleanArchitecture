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

  [HttpDelete("{id}")]
  public async Task<ActionResult<int>> Delete(int id)
  {
    await Mediator.Send(new DeleteCategoryCommand { Id = id });

    return NoContent();
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> Update(int id, UpdateCategoryCommand command)
  {
    if(id != command.Id)
    {
      return BadRequest();
    }

    await Mediator.Send(command);

    return NoContent();
  }

}
