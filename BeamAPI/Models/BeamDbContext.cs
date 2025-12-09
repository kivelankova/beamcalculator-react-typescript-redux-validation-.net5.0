using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    // perii DbContect luokan (Microsoft.EntityFrameworkCore nimiavaruudesta)
    public class BeamDbContext : DbContext
    {
        // konstruktori/muodostin joka ottaa vastaan parametrin ja välitetään se DBContext-luokalle
        public BeamDbContext(DbContextOptions<BeamDbContext> options):base(options)
        {
        }
 
        // Luotavat Tietokannan taulut
        public DbSet<Beam> Beams { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<ForceType> ForceTypes { get; set; }
        public DbSet<Material> Materials { get; set; }

    }
}
