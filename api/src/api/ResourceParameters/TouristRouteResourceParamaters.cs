using System;
using System.Text.RegularExpressions;

namespace Ctrip.API.ResourceParameters
{
    // 旅游路线分页参数
    public class TouristRouteResourceParamaters : PaginationResourceParamaters
    {
        public string OrderBy { get; set; }
        public string Keyword { get; set; }
        public string RatingOperator { get; set; }
        public int? RatingValue { get; set; }
        private string _rating;
        public string Rating
        {
            get { return _rating; }
            set
            {
                if (!string.IsNullOrWhiteSpace(value))
                {
                    Regex regex = new Regex(@"([A-Za-z0-9\-]+)(\d+)");
                    Match match = regex.Match(value);
                    if (match.Success)
                    {
                        RatingOperator = match.Groups[1].Value;
                        RatingValue = Int32.Parse(match.Groups[2].Value);
                    }
                }
                _rating = value;
            }
        }

        public string Fields { get; set; }
    }
}
