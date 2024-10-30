using VentaProductos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace VentaProductos.Controllers
{
    [Route("DetalleVenta")]
    [ApiController]
    public class DetalleVentaController : ControllerBase
    {
        private readonly Context _context;

        public DetalleVentaController(Context context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<DetalleVenta>>> GetDetalleVenta(int id)
        {
            var DetalleVenta = await _context.DetalleVenta.Include(x => x.Producto).Where(x => x.IdVenta == id).ToListAsync();
            if (DetalleVenta == null)
            {
                return NotFound();
            }

            return DetalleVenta;
        }

        [HttpPost]
        public async Task<ActionResult<DetalleVenta>> PostDetalleVenta(DetalleVenta detalleVenta)
        {
            _context.DetalleVenta.Add(detalleVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetalleVenta", new { id = detalleVenta.Id }, detalleVenta);
        }
    }
}