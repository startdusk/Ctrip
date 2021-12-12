using System.Collections.Generic;

namespace Ctrip.API.Services
{
    public class PropertyMappingValue
    {
        // 将会被映射的目标属性
        public IEnumerable<string> DestinationProperties { get; private set; }

        public PropertyMappingValue(IEnumerable<string> destinationProperyties)
        {
            DestinationProperties = destinationProperyties;
        }
    }
}