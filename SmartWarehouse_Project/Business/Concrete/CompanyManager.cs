using SmartWarehouse.Business.Abstract;
using SmartWarehouse.Data.Repositories.Abstract;
using SmartWarehouse.Dto.Common;
using SmartWarehouse.Dto.CompanyDtos;
using SmartWarehouse.Entities;

namespace SmartWarehouse.Business.Concrete;

public class CompanyManager : ICompanyService
{
    private readonly ICompanyRepository _repository;

    public CompanyManager(ICompanyRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<CompanyDto>> GetPagedAsync(Guid companyId, int page, int pageSize, string? search)
    {
        var (data, totalCount) = await _repository.GetPagedAsync(companyId, page, pageSize, search);

        return new PagedResult<CompanyDto>
        {
            Success = true,
            Data = data.Select(x => new CompanyDto
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                TaxNumber = x.TaxNumber,
                Email = x.Email,
                Phone = x.Phone,
                Address = x.Address,
                IsActive = x.IsActive
            }).ToList(),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };
    }

    public async Task<CompanyDto?> GetByIdAsync(int id, Guid companyId)
    {
        var entity = await _repository.GetByIdAsync(id, companyId);
        if (entity == null) return null;

        return new CompanyDto
        {
            Id = entity.Id,
            CompanyId = entity.CompanyId,
            Name = entity.Name,
            TaxNumber = entity.TaxNumber,
            Email = entity.Email,
            Phone = entity.Phone,
            Address = entity.Address,
            IsActive = entity.IsActive
        };
    }

    public async Task<CompanyDto> CreateAsync(CreateCompanyDto dto)
    {
        var entity = new Company
        {
            CompanyId = dto.CompanyId,
            Name = dto.Name,
            TaxNumber = dto.TaxNumber,
            Email = dto.Email,
            Phone = dto.Phone,
            Address = dto.Address,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        await _repository.AddAsync(entity);
        await _repository.SaveAsync();

        return new CompanyDto
        {
            Id = entity.Id,
            CompanyId = entity.CompanyId,
            Name = entity.Name,
            TaxNumber = entity.TaxNumber,
            Email = entity.Email,
            Phone = entity.Phone,
            Address = entity.Address,
            IsActive = entity.IsActive
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateCompanyDto dto)
    {
        var entity = await _repository.GetByIdAsync(id, dto.CompanyId);
        if (entity == null) return false;

        entity.Name = dto.Name;
        entity.TaxNumber = dto.TaxNumber;
        entity.Email = dto.Email;
        entity.Phone = dto.Phone;
        entity.Address = dto.Address;
        entity.IsActive = dto.IsActive;
        entity.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(entity);
        await _repository.SaveAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id, Guid companyId)
    {
        var entity = await _repository.GetByIdAsync(id, companyId);
        if (entity == null) return false;

        entity.IsDeleted = true;
        entity.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(entity);
        await _repository.SaveAsync();

        return true;
    }
}