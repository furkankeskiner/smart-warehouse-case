using SmartWarehouse.Dto.Common;
using SmartWarehouse.Dto.CompanyDtos;

namespace SmartWarehouse.Business.Abstract;

public interface ICompanyService
{
    Task<PagedResult<CompanyDto>> GetPagedAsync(Guid companyId, int page, int pageSize, string? search);
    Task<CompanyDto?> GetByIdAsync(int id, Guid companyId);
    Task<CompanyDto> CreateAsync(CreateCompanyDto dto);
    Task<bool> UpdateAsync(int id, UpdateCompanyDto dto);
    Task<bool> DeleteAsync(int id, Guid companyId);
}