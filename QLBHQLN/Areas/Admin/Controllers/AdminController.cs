using QLBHQLN.Areas.Admin.AdViewModel;
using QLBHQLN.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLBHQLN.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        private QLNModel dbcontext = new QLNModel();
        public ActionResult Admin()
        {
            if (Session["Login"] == null || (bool)Session["Login"] == false)
            {
                return RedirectToAction("Login", "Login", new {area = ""});
            }
            var products = dbcontext.Products.ToList();
            ViewBag.Message = products.Count();
            return View(products);
        }
        public ActionResult AdminQLDH()
        {
            var orders = (from o in dbcontext.Orders
                          join a in dbcontext.Accounts on o.Email equals a.Email
                          //from nxbf in nxbtemp.DefaultIfEmpty()
                          orderby o.OrderDate descending
                          select new HoaDonDisplayVM()
                          {
                              OrderId = o.OrderId,
                              Fullname = a.Fullname,
                              OrderDate = o.OrderDate,
                              TotalPrice = o.TotalPrice,
                              status = o.status
                          }).ToList();
            ViewBag.Message = orders.Count();
            return View(orders);
        }
        public ActionResult OrderDetailPage(string id)
        {
            var details = (from ct in dbcontext.OrdersDetails
                           join p in dbcontext.Products on ct.ProductId equals p.ProductId
                           where ct.OrderId == id
                           select new ChitietHoaDonDisplayVM()
                           {
                               OrderId = id,
                               ProductId = p.ProductId,
                               ProductName = p.ProductName,
                               ProductImage = p.ProductImage,
                               Quantity = ct.Quantity,
                               GiaBan = ct.Giaban
                           }).ToList();
            ViewBag.Message = details.Count();
            return View(details);
        }

        [HttpPost]
        public ActionResult EditOrders(string id, string status)
        {
            var item = dbcontext.Orders.FirstOrDefault(m => m.OrderId == id);
            if (item == null)
            {
                return Json(new { success = false, message = "Order not found" });
            }
            item.status = status == "Approved" ? "Chap Nhan" : "Tu Choi";
            dbcontext.SaveChanges();
            return Json(new { success = true, message = "Order status updated" });
        }

        [HttpPost]
        public ActionResult AddProducts(HangHoaVM formData, HttpPostedFileBase fileUpload)
        {
            var item = new Product();
            item.ProductId = (dbcontext.Products.Count() + 1).ToString();
            item.ProductName = formData.ProductName;
            item.Soluongton = formData.Soluongton;
            item.Maloai = formData.Maloai;
            item.Price = formData.Price;

            //get file
            var fileName = System.IO.Path.GetFileName(fileUpload.FileName);

            //get path
            var path = Path.Combine(Server.MapPath("~/Images/"), fileName);

            //ktra path
            if (System.IO.File.Exists(path))
            {
                ViewBag.Message = "Ảnh này đã tồn tại!";
            }
            else
            {
                fileUpload.SaveAs(path);
            }
            item.ProductImage = fileName;
            dbcontext.Products.Add(item);
            dbcontext.SaveChanges();
            return RedirectToAction("Admin", "Admin");
        }

        [HttpPost]
        public ActionResult EditProducts(HangHoaVM formData,  HttpPostedFileBase fileUpload)
        {
            var item = dbcontext.Products.Where(i => i.ProductId == formData.ProductId).FirstOrDefault();
            if (item == null)
            {
                return RedirectToAction("Admin", "Admin");
            }

            item.ProductName = formData.ProductName;
            item.Soluongton = formData.Soluongton;
            item.Maloai = formData.Maloai;
            item.Price = formData.Price;

            //get file
            var fileName = System.IO.Path.GetFileName(fileUpload.FileName);

            //get path
            var path = Path.Combine(Server.MapPath("~/Images/"), fileName);

            //ktra path
            if (System.IO.File.Exists(path))
            {
                ViewBag.Message = "Ảnh này đã tồn tại!";
            }
            else
            {
                fileUpload.SaveAs(path);
            }
            item.ProductImage = fileName;
            
            dbcontext.SaveChanges();
            return RedirectToAction("Admin", "Admin");
        }

        public ActionResult DeleteProducts(string id)
        {
            var item = dbcontext.Products.Where(i => i.ProductId == id).FirstOrDefault();
            if (item == null)
            {
                return RedirectToAction("Admin", "Admin");
            }
            dbcontext.Products.Remove(item);
            dbcontext.SaveChanges();
            return RedirectToAction("Admin", "Admin");
        }
    }
}
