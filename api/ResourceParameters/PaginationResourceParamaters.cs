namespace Ctrip.API.ResourceParameters
{
    // 旅游路线分页参数
    public class PaginationResourceParamaters
    {

        private int _pageNumber = 1;

        public int PageNumber
        {
            get
            {
                return _pageNumber;
            }
            set
            {
                // 页面不能为负值
                if (value >= 1)
                {
                    _pageNumber = value;
                }
            }
        }

        private int _pageSize = 10;
        private int maxPageSize = 50;

        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                if (value >= 1)
                {
                    _pageSize = (value > maxPageSize) ? maxPageSize : value;
                }
            }
        }
    }
}
