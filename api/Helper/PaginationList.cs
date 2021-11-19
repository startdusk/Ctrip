using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Ctrip.API.Helper
{
    public class PaginationList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }

        public PaginationList(int currentPage, int pageSize, List<T> items)
        {
            CurrentPage = currentPage;
            PageSize = pageSize;
            AddRange(items);
        }

        public static async Task<PaginationList<T>> CreateAsync(int currentPage, int pageSize, IQueryable<T> result)
        {
            // 数据分页
            // 1.数据排序 在外部设定好排序条件(外部处理)
            // 2.跳过一定量的数据
            // 3.以pagesize为标准显示一定数量的数据

            // include vs join
            // return await result.ToListAsync();
            var skip = (currentPage - 1) * pageSize;
            result = result.Skip(skip);
            result = result.Take(pageSize);
            var items = await result.ToListAsync();
            return new PaginationList<T>(currentPage, pageSize, items);
        }
    }
}