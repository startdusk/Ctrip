using System.Collections.Generic;

namespace Ctrip.API.Dtos
{

    public class ProductCollectionsDto
    {

        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }
        public ICollection<TouristRouteDto> TouristRoutes { get; set; }
    }
}