using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLBHQLN.ViewModels
{
    public class LoginVM
    {
        public string email { get; set; }
        public string password { get; set; }
        public string password2 { get; set; }
        public string fullname { get; set; }
        public string Sdt { get; set; }
        public string role { get; set; }
    }
}