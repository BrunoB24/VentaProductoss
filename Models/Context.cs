using Microsoft.EntityFrameworkCore;
using VentaProductos.Models;


namespace VentaProductos.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }
         public DbSet<Cliente> Clientes { get; set;} = null!;

    public DbSet<Producto> Productos{ get; set; } = null!;

    public DbSet<Venta> Ventas { get; set; } = null!;
}

   

    