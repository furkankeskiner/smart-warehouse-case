using SmartWarehouse.Entities;

namespace SmartWarehouse.Data.Repositories.Abstract;

public interface ICompanyRepository
{
    Task<(List<Company> Data, int TotalCount)> GetPagedAsync(Guid companyId, int page, int pageSize, string? search);
    Task<Company?> GetByIdAsync(int id, Guid companyId);
    Task AddAsync(Company company);
    Task UpdateAsync(Company company);
    Task SaveAsync();
}