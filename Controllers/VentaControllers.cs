using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VentaProductos.Models;

namespace VentaProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaControllers : ControllerBase
    {
        private readonly Context _context;

        public VentaControllers(Context context)
        {
            _context = context;
        }

        // GET: api/VentaControllers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
           var venta = await _context.Ventas.Include(x => x.Cliente).ToListAsync();
            return venta;
        }

        // GET: api/VentaControllers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);

            if (venta == null)
            {
                return NotFound();
            }

            return venta;
        }

        // PUT: api/VentaControllers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenta(int id, Venta venta)
        {
            if (id != venta.Id)
            {
                return BadRequest();
            }

            _context.Entry(venta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VentaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(venta);
        }

        // POST: api/VentaControllers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(Venta venta)
        {

            var cliente = await _context.Clientes.Include(c => c.Venta)
                .FirstOrDefaultAsync(c => c.Id == venta.IdCliente);

            if (cliente != null && cliente.Venta != null && cliente.Venta.Any(v => v.Finalizada != true))
            {
                return BadRequest(new { message = "El Cliente tiene una venta pendiente." });
            }

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVenta", new { id = venta.Id }, venta);
        }

        // DELETE: api/VentaControllers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null)
            {
                return NotFound();
            }

            if (!venta.Finalizada)
            {
                return BadRequest("No se puede eliminar porque hay una venta pendiente.");
            }

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VentaExists(int id)
        {
            return _context.Ventas.Any(e => e.Id == id);
        }
    }
}