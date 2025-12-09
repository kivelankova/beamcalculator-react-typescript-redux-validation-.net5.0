using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class Beam
    {
        // BeamId on pääavain (PK).
        [Key]
        public int BeamId { get; set; }
        // BeamName ja BeamDefinition voi olla maksimissaan 200 merkkiä pitkiä.
        [Column(TypeName = "nvarchar(200)")]
        public string BeamName { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string BeamDefinition { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Span { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal A { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal B { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal S1 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal S2 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Vmax { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Vmin { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Mmax { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Mmin { get; set; }
        [Column(TypeName = "decimal(18,6)")]
        public decimal Dmax { get; set; }
        [Column(TypeName = "decimal(18,6)")]
        public decimal Dmin { get; set; }
        // Listaa Beam:n Type:t
        public List<Type> Types { get; set; }
    }
}
