using Microsoft.EntityFrameworkCore;
using SmartWarehouse.Data.Context;
using SmartWarehouse.Data.Repositories.Abstract;
using SmartWarehouse.Entities;

namespace SmartWarehouse.Data.Repositories.Concrete;

public class CompanyRepository : ICompanyRepository
{
    private readonly AppDbContext _context;

    public CompanyRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(List<Company> Data, int TotalCount)> GetPagedAsync(Guid companyId, int page, int pageSize, string? search)
    {
        var query = _context.Companies
            .Where(x => x.CompanyId == companyId);

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(x =>
                x.Name.Contains(search) ||
                x.TaxNumber.Contains(search) ||
                x.Email.Contains(search));
        }

        var totalCount = await query.CountAsync();

        var data = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (data, totalCount);
    }

    public async Task<Company?> GetByIdAsync(int id, Guid companyId)
    {
        return await _context.Companies
            .FirstOrDefaultAsync(x => x.Id == id && x.CompanyId == companyId);
    }

    public async Task AddAsync(Company company)
    {
        await _context.Companies.AddAsync(company);
    }

    public async Task UpdateAsync(Company company)
    {
        _context.Companies.Update(company);
        await Task.CompletedTask;
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}