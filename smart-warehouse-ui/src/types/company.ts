export interface Company {
  id: number;
  companyId: string;
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
}

export interface CreateCompanyDto {
  companyId: string;
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
}

export interface UpdateCompanyDto {
  companyId: string;
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
}

export interface PagedResult<T> {
  success: boolean;
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
