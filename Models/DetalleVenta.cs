using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models
{
    public class DetalleVenta
    {
        
        public int Id { get; set; }

       
        [StringLength(100, MinimumLength = 1, ErrorMessage = "El nombre del producto debe contener entre {2} y {1} caracteres.")]
        public int IdProducto { get; set; }

        public virtual Producto? Producto {get; set;}

        public int IdVenta { get; set; }

        public virtual Venta? Venta {get; set;}

        
        [Range(0.01, double.MaxValue, ErrorMessage = "Debe poner un precio de compra.")]
        public string? RelacionVenta { get; set; }

       
        
    }
}
