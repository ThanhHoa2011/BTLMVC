using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLBHQLN.Areas.Admin.AdViewModel
{
    public class ChitietHoaDonDisplayVM
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int? Quantity { get; set; }
        public double? GiaBan { get; set; }
    }
}