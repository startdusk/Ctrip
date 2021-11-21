using System;
using System.Collections.Generic;
using System.Linq;
using Ctrip.API.Services;
using System.Linq.Dynamic.Core;

namespace Ctrip.API.Helper
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplySort<T>(
            // 拓展方法需要加this
            this IQueryable<T> source,
            string orderBy,
            Dictionary<string, PropertyMappingValue> mappingDictionary
        )
        {
            if (source == null)
            {
                throw new ArgumentNullException("source");
            }

            if (mappingDictionary == null)
            {
                throw new ArgumentNullException("mappingDictionary");
            }

            if (string.IsNullOrWhiteSpace(orderBy))
            {
                return source;
            }

            var orderByString = string.Empty;
            var orderByAfterSplit = orderBy.Split(",");
            foreach (var order in orderByAfterSplit)
            {
                var trimmedOrder = order.Trim();
                // 通过字符串 "desc" 来判断升序还是降序
                var orderDescending = trimmedOrder.EndsWith(" desc");
                // 通过删除升序降序字符串 " asc" or " desc" 来获得属性名称
                var indexOfFirstSpace = trimmedOrder.IndexOf(" ");
                var propertyName = indexOfFirstSpace == -1
                    ? trimmedOrder
                    : trimmedOrder.Remove(indexOfFirstSpace);

                if (!mappingDictionary.ContainsKey(propertyName))
                {
                    throw new ArgumentException($"key mapping for {propertyName} is missing");
                }

                var propertyMappingValue = mappingDictionary[propertyName];
                if (propertyMappingValue == null)
                {
                    throw new ArgumentNullException("propertyMappingValue");
                }

                foreach (var destinationProperty in
                // TODO: 这里为什么使用倒序(提示：倒序的顺序遍历才是正确的)
                    propertyMappingValue.DestinationProperties.Reverse())
                {
                    // 给IQueryable添加排序字符串
                    orderByString = orderByString +
                        (string.IsNullOrWhiteSpace(orderByString) ? string.Empty : ", ")
                        + destinationProperty
                        + (orderDescending ? " descending" : " ascending");
                }
            }

            return source.OrderBy(orderByString);
        }
    }
}