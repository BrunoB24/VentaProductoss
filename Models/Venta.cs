using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models {

    public class Venta
    {
        
        public int Id { get; set; }

       
        [StringLength(100, MinimumLength = 1, ErrorMessage = "El nombre del producto debe contener entre {2} y {1} caracteres.")]
        public DateTime FehcaVenta { get; set; }

        public bool? Finalizada { get; set; }

        
        [Range(0.01, double.MaxValue, ErrorMessage = "Debe poner un precio de compra.")]
        public int IdCliente { get; set; }

        // public virtual Cliente? Cliente {get; set;}

        public string? RelacionDetalleVenta { get; set; }
        
        // public virtual ICollection<DetalleVenta>? DetalleVentas {get; set;}
        }
        
        
        }
       
        
     
      
        
        