using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;

using Ctrip.API.Dtos;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace Ctrip.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductCollectionsController : ControllerBase
    {
        public IActionResult Get()
        {
            var productCollectionsJsonData = System.IO.File.ReadAllText(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + @"/Database/productCollectionsMockData.json");
            IList<ProductCollectionsDto> productCollectionsDtos = JsonConvert.DeserializeObject<IList<ProductCollectionsDto>>(productCollectionsJsonData);

            return Ok(productCollectionsDtos);
        }
    }
}
