using CleanArchitecture.Application.Products.Commands.CreateProduct;
using CleanArchitecture.Application.Products.Commands.DeleteProduct;
using CleanArchitecture.Application.Products.Commands.UpdateProduct;
using CleanArchitecture.Application.Products.Queries.GetProductsWithPagination;
using CleanArchitecture.Application.Products.Queries.GetProducts;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;
public class ProductController : ApiControllerBase
{
  [HttpGet]  
  public async Task<ActionResult<ProductsVm>> Get()
  {
    return await Mediator.Send(new GetProductsQuery());
  }

  [HttpPost]
  public async Task<ActionResult<int>> Create(CreateProductCommand command)
  {
    return await Mediator.Send(command);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<int>> Delete(int id)
  {
    await Mediator.Send(new DeleteProductCommand { Id = id });

    return NoContent();
  }

  [HttpPut("id")]
  public async Task<ActionResult> Update(int id, UpdateProductCommand command)
  {
    if(id != command.Id)
    {
      return BadRequest();
    }

    await Mediator.Send(command);

    return NoContent();
  }

}
