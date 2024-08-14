using QLBHQLN.Models;
using QLBHQLN.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLBHQLN.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        private QLNModel DataQLN = new QLNModel();
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult XLLogin(LoginVM loginform)
        {
            var account = DataQLN.Accounts.FirstOrDefault(a => a.Email==loginform.email && a.Password==loginform.password);
            if (account == null)
            {
                return Json(new { success = false, message = "Vui long nhap lai !"});
            }
            else
            {
                Session["Login"] = true;
                var role = account.Role;
                if (role == "User")
                {
                    return Json(new { success = true, redirectUrl = Url.Action("Index", "User")});
                }
                else
                {
                    return Json(new { success = true, redirectUrl = Url.Action("Admin", "Admin", new { area = "Admin"}) });
                }
            }
        }
        [HttpPost]
        public ActionResult XLDangKy(LoginVM loginform) 
        {
            var account = DataQLN.Accounts.FirstOrDefault(a => a.Email == loginform.email);
            if (account != null)
            {
                return Json(new { success = false, message = "Vui long nhap lai !" });
            }
            else
            {
                var item = new Account()
                {
                    Email = loginform.email,
                    Password = loginform.password,
                    Fullname = loginform.fullname,
                    Sdt = "",
                    Address = "",
                    Avatar = "",
                    Role = "User"
                };
                DataQLN.Accounts.Add(item);
                DataQLN.SaveChanges();
                return Json(new { success = true, redirectUrl = Url.Action("Login","Login") });
            }
        }
        
        public ActionResult Dangxuat()
        {
            Session["Login"]= false;
            Session.Clear();
            return RedirectToAction("Login","Login");
        }
    }
}