using System;
using System.Collections.Generic;
using Ctrip.API.Dtos;
using Ctrip.API.Models;
using System.Linq;

namespace Ctrip.API.Services
{
    public class PropertyMappingService : IPropertyMappingService
    {
        private Dictionary<string, PropertyMappingValue> _touristRoutePropertyMapping =
            new Dictionary<string, PropertyMappingValue>(StringComparer.OrdinalIgnoreCase)
            {
                {"Id", new PropertyMappingValue(new List<string>() {"Id"})},
                {"Title", new PropertyMappingValue(new List<string>() {"Title"})},
                {"Rating", new PropertyMappingValue(new List<string>() {"Rating"})},
                {"OriginalPrice", new PropertyMappingValue(new List<string>() {"OriginalPrice"})}
            };

        private IList<IPropertyMapping> _properyMappings = new List<IPropertyMapping>();

        public PropertyMappingService()
        {
            _properyMappings.Add(new PropertyMapping<TouristRouteDto, TouristRoute>(_touristRoutePropertyMapping));
        }

        public Dictionary<string, PropertyMappingValue>
            GetPropertyMapping<TSource, TDestination>()
        {
            // 获取匹配的映射对象
            var matchingMapping = _properyMappings.OfType<PropertyMapping<TSource, TDestination>>();
            if (matchingMapping.Count() == 1)
            {
                return matchingMapping.First().MappingDictionary;
            }

            throw new Exception($"Cannot find exact property mapping instance for <{typeof(TSource)}, {typeof(TDestination)}>");
        }

        public bool IsMappingExists<TSource, TDestination>(string fields)
        {
            var propertyMapping = GetPropertyMapping<TSource, TDestination>();
            if (string.IsNullOrWhiteSpace(fields))
            {
                return true;
            }
            // 逗号来分割字段字符串
            var fieldsAfterSplit = fields.Split(",");
            foreach (var field in fieldsAfterSplit)
            {
                if (!isMappingValid(field, propertyMapping))
                {
                    return false;
                }
            }

            return true;
        }

        private bool isMappingValid(string field,
            Dictionary<string, PropertyMappingValue> propertyMapping)
        {
            // 如 rating 或 rating desc
            // 去掉空格
            var trimedField = field.Trim();
            // 获得属性名称字符串
            var split = trimedField.Split(" ");
            if (split.Length == 1)
            {
                // 只有 一个属性的情况(没有排序)
                var propertyName = split[0];
                if (!propertyMapping.ContainsKey(propertyName))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            if (split.Length > 2)
            {
                // 空格过多或多个属性没有用逗号分隔开
                return false;
            }
            // 判断排序参数是否正确
            var desc = split[1];
            if (!desc.ToLowerInvariant().Equals("desc"))
            {
                return false;
            }

            // 获得属性名称字符串
            var indexOfFirstSpace = trimedField.IndexOf(" ");
            var property = indexOfFirstSpace == -1
                ? trimedField
                : trimedField.Remove(indexOfFirstSpace);
            if (!propertyMapping.ContainsKey(property))
            {
                return false;
            }

            return true;
        }
    }
}