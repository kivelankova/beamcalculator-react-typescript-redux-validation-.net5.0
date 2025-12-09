using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeamAPI.Models;

namespace BeamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeamController : ControllerBase
    {
        // context otetaan privaattiin _context-muuttujaan talteen, jota käytetään jatkossa.
        private readonly BeamDbContext _context;

        // Kontrollerissa otetaan context käyttöön
        public BeamController(BeamDbContext context)
        {
            _context = context;
        }

        // GET: api/Beam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beam>>> GetBeams()
        {
            // Lisätään Beam:iin liittyvät Typet
            var newbeam = await _context.Beams
                .Include(blog => blog.Types)
                .ToListAsync();
            return newbeam;
        }

        // GET: api/Beam/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Beam>> GetBeam(int id)
        {
            var beam = await _context.Beams.FindAsync(id);

            if (beam == null)
            {
                return NotFound();
            }

            return beam;
        }

        // PUT: api/Beam/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeam(int id, Beam beam)
        {
            if (id != beam.BeamId)
            {
                return BadRequest();
            }

            _context.Entry(beam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Beam
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Beam>> PostBeam(Beam beam)
        {
            _context.Beams.Add(beam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeam", new { id = beam.BeamId }, beam);
        }

        // DELETE: api/Beam/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeam(int id)
        {
            var beam = await _context.Beams.FindAsync(id);
            if (beam == null)
            {
                return NotFound();
            }

            _context.Beams.Remove(beam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BeamExists(int id)
        {
            return _context.Beams.Any(e => e.BeamId == id);
        }
    }
}
