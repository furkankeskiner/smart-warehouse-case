type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Önceki
      </button>
      <span>Sayfa {page} / {totalPages || 1}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Sonraki
      </button>
    </div>
  );
}
