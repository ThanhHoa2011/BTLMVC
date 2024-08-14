namespace QLBHQLN.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            OrdersDetails = new HashSet<OrdersDetail>();
        }

        [StringLength(100)]
        public string ProductId { get; set; }

        [StringLength(255)]
        public string ProductName { get; set; }

        public int Maloai { get; set; }

        [StringLength(255)]
        public string ProductImage { get; set; }

        public int? Soluongton { get; set; }

        public double? Price { get; set; }

        [Column(TypeName = "text")]
        public string Mota { get; set; }

        public virtual Loai Loai { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrdersDetail> OrdersDetails { get; set; }
    }
}
