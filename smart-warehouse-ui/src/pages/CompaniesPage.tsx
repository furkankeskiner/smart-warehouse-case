import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Company, CreateCompanyDto, PagedResult, UpdateCompanyDto } from "../types/company";
import CompanyForm from "../components/CompanyForm";
import Pagination from "../components/Pagination";

const companyId = "11111111-1111-1111-1111-111111111111";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await api.get<PagedResult<Company>>("/companies", {
        params: { companyId, page, pageSize, search }
      });
      setCompanies(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error(error);
      alert("Şirketler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, [page, search]);

  const handleCreate = async (data: CreateCompanyDto | UpdateCompanyDto) => {
    await api.post("/companies", data);
    setCreateOpen(false);
    setPage(1);
    await loadCompanies();
  };

  const handleEdit = async (data: CreateCompanyDto | UpdateCompanyDto) => {
    if (!selectedCompany) return;
    await api.put(`/companies/${selectedCompany.id}`, data);
    setEditOpen(false);
    setSelectedCompany(null);
    await loadCompanies();
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Bu kaydı silmek istiyor musun?");
    if (!ok) return;
    await api.delete(`/companies/${id}`, { params: { companyId } });
    await loadCompanies();
  };

  return (
    <div className="container">
      <h1>Akıllı Depo Yönetimi - Şirketler</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Ad, vergi no veya email ile ara"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => { setPage(1); setSearch(searchText); }}>Ara</button>
        <button onClick={() => { setSearchText(""); setSearch(""); setPage(1); }}>Temizle</button>
        <button onClick={() => setCreateOpen(true)}>Yeni Şirket</button>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table className="company-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Vergi No</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Adres</th>
              <th>Aktif</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr><td colSpan={8}>Kayıt bulunamadı.</td></tr>
            ) : (
              companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.taxNumber}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td>{company.address}</td>
                  <td>{company.isActive ? "Evet" : "Hayır"}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { setSelectedCompany(company); setEditOpen(true); }}>Güncelle</button>
                    <button onClick={() => handleDelete(company.id)}>Sil</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <CompanyForm open={createOpen} mode="create" onClose={() => setCreateOpen(false)} onSubmit={handleCreate} />
      <CompanyForm
        open={editOpen}
        mode="edit"
        initialData={selectedCompany}
        onClose={() => { setEditOpen(false); setSelectedCompany(null); }}
        onSubmit={handleEdit}
      />
    </div>
  );
}
