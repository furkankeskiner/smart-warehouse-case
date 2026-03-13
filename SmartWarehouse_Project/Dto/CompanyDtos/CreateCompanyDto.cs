using System.ComponentModel.DataAnnotations;

namespace SmartWarehouse.Dto.CompanyDtos;

public class CreateCompanyDto
{
    [Required]
    public Guid CompanyId { get; set; }

    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string TaxNumber { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Address { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}