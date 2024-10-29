using System.ComponentModel.DataAnnotations;  


namespace VentaProductos.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "El Nombre debe contener entre {2} y {1} caracteres.")]
        public string? NombreCliente { get; set; }

        
        public string? ApellidoCliente { get; set; }

        [Required(ErrorMessage = "El DNI es obligatorio.")]
        
        public int Dni { get; set; }

        public float Saldo { get; set; }
    }
}

