using QLBHQLN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Web;

namespace QLBHQLN.ViewModels
{
    public class SanPhamVM
    {
        public string ProductId {  get; set; }
        public string ProductName {  get; set; }
	    public string ProductImage { get; set; }
	    public double? Price { get; set; }
    }
}