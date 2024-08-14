using QLBHQLN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLBHQLN.ViewModels
{
    public class CartItem
    {
        public Product Product { get; set; }
        public int? Soluong { get; set; }

    }
}