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
    public class ForceTypeController : ControllerBase
    {
        private readonly BeamDbContext _context;

        public ForceTypeController(BeamDbContext context)
        {
            _context = context;
        }

        // GET: api/ForceType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ForceType>>> GetForceTypes()
        {
            return await _context.ForceTypes.ToListAsync();
        }
    }
}
