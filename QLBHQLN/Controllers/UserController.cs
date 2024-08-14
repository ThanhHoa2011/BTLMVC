using QLBHQLN.Models;
using QLBHQLN.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.Mvc;

namespace QLBHQLN.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        private QLNModel DataQLN = new QLNModel();
        public ActionResult Index()
        {
            //if (Session["Login"]==null || (bool)Session["Login"] == false)
            //{
            //    return RedirectToAction("Login","Login");
            //}
            var products = DataQLN.Products.ToList();
            ViewBag.Message = products.Count();
            return View(products);
        }


        public  ActionResult Cart ()
        {
            var products = DataQLN.Products.ToList();
            ViewBag.Message = products.Count();
            return View(products);
        }

        public ActionResult GetSanPham()
        {
            var products = DataQLN.Products.ToList();
            return Json(products, JsonRequestBehavior.AllowGet);
        }
        public ActionResult XLGioHang(string productId)
        {
            var sp = DataQLN.Products.FirstOrDefault(pid => pid.ProductId == productId);
            if (sp == null)
            {
                return Json(new { success = false, message = "Không tìm thấy sản phẩm này!" }, JsonRequestBehavior.AllowGet);
            }

            List<CartItem> cartSession = Session["cartSession"] as List<CartItem>;
            if (cartSession == null)
            {
                cartSession = new List<CartItem>();
            }

            var existingItem = cartSession.FirstOrDefault(c => c.Product.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Soluong += 1;
            }
            else
            {
                cartSession.Add(new CartItem { Product = sp, Soluong = 1 });
            }

            Session["cartSession"] = cartSession;

            return Json(new { success = true, message = "Đã thêm vào giỏ hàng!" , redirectUrl = Url.Action("Giohang", "User") }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Giohang()
        {
            var cart = Session["cartSession"] as List<CartItem>;
            return View(cart);
        }

        public ActionResult CapNhatGioHang()
        {
            var cart = Session["cartSession"] as List<CartItem>;
            if (cart == null)
            {
                cart = new List<CartItem>();

                foreach (var itemCart in cart)
                {
                    var product = DataQLN.Products.FirstOrDefault(p => p.ProductId == itemCart.Product.ProductId);
                    if (product != null)
                    {
                        var cartItem = new CartItem
                        {
                            Product = product,
                            Soluong = itemCart.Soluong
                        };
                        cart.Add(cartItem);
                    }
                    break;
                }
            }

            Session["cartSession"] = cart;

            return PartialView(cart);
        }
        public ActionResult XLDonhang(FormDH formDH)
        {
            var cart = Session["cartSession"] as List<CartItem>;
            if (cart == null)
            {
                return RedirectToAction("Giohang", "User");
            }
            string email = Session["Email"] as string;
            var account = DataQLN.Accounts.FirstOrDefault(p => p.Email == email);
            if (account != null)
            {
                account.Fullname = formDH.tenkh;
                account.Address = formDH.diachi;
                account.Sdt = formDH.sdt;
                DataQLN.SaveChanges();
                var order = new Order
                {
                    OrderId = (DataQLN.Orders.Count() + 1).ToString(),
                    Email = email,
                    OrderDate = DateTime.Now,
                    TotalPrice = cart.Sum(t => t.Soluong * t.Product.Price),
                    status = "Cho duyet"

                };
                DataQLN.Orders.Add(order);
                DataQLN.SaveChanges();
                Session["cartSession"] = null;
            }
            return RedirectToAction("Giohang","User");
        }
    }
}