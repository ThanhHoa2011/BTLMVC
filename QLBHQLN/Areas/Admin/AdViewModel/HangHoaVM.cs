using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLBHQLN.Areas.Admin.AdViewModel
{
    public class HangHoaVM
    {
        public string ProductId { get; set; }

        public string ProductName { get; set; }

        public int Maloai { get; set; }

        public string ProductImage { get; set; }

        public int? Soluongton { get; set; }

        public double? Price { get; set; }
        public string Mota { get; set; }
    }
}