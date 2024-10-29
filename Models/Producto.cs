
using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models
{
    public class Producto
    {
        
        public int Id { get; set; }

       
        [StringLength(100, MinimumLength = 1, ErrorMessage = "El nombre del producto debe contener entre {2} y {1} caracteres.")]
        public string? NombreProducto { get; set; }

        public int Cantidad { get; set; }

        
        [Range(0.01, double.MaxValue, ErrorMessage = "Debe poner un precio de compra.")]
        public float PrecioCompra { get; set; }

       
        [Range(0.01, double.MaxValue, ErrorMessage = "Debe poner un precio de venta.")]
        public float PrecioVenta { get; set; }
    }
}

    

