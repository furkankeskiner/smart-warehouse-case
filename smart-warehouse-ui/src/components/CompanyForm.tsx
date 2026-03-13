import { useEffect, useState } from "react";
import { Company, CreateCompanyDto, UpdateCompanyDto } from "../types/company";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Company | null;
  onClose: () => void;
  onSubmit: (data: CreateCompanyDto | UpdateCompanyDto) => Promise<void>;
};

const defaultCompanyId = "11111111-1111-1111-1111-111111111111";

export default function CompanyForm({
  open,
  mode,
  initialData,
  onClose,
  onSubmit
}: Props) {
  const [form, setForm] = useState<CreateCompanyDto>({
    companyId: defaultCompanyId,
    name: "",
    taxNumber: "",
    email: "",
    phone: "",
    address: "",
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        companyId: initialData.companyId,
        name: initialData.name,
        taxNumber: initialData.taxNumber,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
        isActive: initialData.isActive
      });
    } else {
      setForm({
        companyId: defaultCompanyId,
        name: "",
        taxNumber: "",
        email: "",
        phone: "",
        address: "",
        isActive: true
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{mode === "create" ? "Şirket Ekle" : "Şirket Güncelle"}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="name" placeholder="Şirket Adı" value={form.name} onChange={handleChange} required />
          <input name="taxNumber" placeholder="Vergi Numarası" value={form.taxNumber} onChange={handleChange} required />
          <input name="email" placeholder="E-posta" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} />
          <textarea name="address" placeholder="Adres" value={form.address} onChange={handleChange} />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
            Aktif
          </label>
          <div className="button-row">
            <button type="submit">{mode === "create" ? "Kaydet" : "Güncelle"}</button>
            <button type="button" onClick={onClose}>İptal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
