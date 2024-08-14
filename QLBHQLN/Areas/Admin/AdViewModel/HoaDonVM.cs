using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace QLBHQLN.Areas.Admin.AdViewModel
{
    public class HoaDonVM
    {
        [DisplayName("Mã hóa đơn")]
        public string OrderId { get; set; }
        [DisplayName("Email")]
        public string Email { get; set; }
        [DisplayName("Ngày đặt hàng")]
        public DateTime? OrderDate { get; set; }
        [DisplayName("Tổng tiền")]
        public double? TotalPrice { get; set; }
        [DisplayName("Trạng thái")]
        public string status { get; set; }
    }
}