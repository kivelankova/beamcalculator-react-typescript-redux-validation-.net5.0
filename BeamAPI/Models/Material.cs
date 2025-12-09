using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeamAPI.Models
{
    public class Material
    {
        [Key]
        public int MaterialId { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string MaterialNameEN { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string MaterialNameFI { get; set; }
        [Range(1, int.MaxValue)]
        public int MaterialNumber { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string MaterialDefinition { get; set; }
    }
}
