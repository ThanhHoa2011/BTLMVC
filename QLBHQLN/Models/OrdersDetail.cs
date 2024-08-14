namespace QLBHQLN.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OrdersDetail
    {
        [Key]
        [StringLength(100)]
        public string OrderDetailId { get; set; }

        [Required]
        [StringLength(100)]
        public string OrderId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductId { get; set; }

        public int? Quantity { get; set; }

        public double? Giaban { get; set; }

        public virtual Order Order { get; set; }

        public virtual Product Product { get; set; }
    }
}
