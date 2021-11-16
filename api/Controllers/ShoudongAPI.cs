using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ctrip.API.Controllers
{
    [Route("api/shoudongapi")]
    //[Controller]
    //public class ShoudongAPIController
    public class ShoudongAPI : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
