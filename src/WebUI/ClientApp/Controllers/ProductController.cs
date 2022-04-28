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
}
