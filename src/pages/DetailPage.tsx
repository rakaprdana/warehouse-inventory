import { useParams } from "react-router-dom";
import { ItemsData } from "../assets/ItemsData";

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const fetchDataById = (id: string) => {
    const mockData = ItemsData;
    return mockData.find((item) => item._id === id);
  };

  const detailData = fetchDataById(id);

  if (!detailData) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>Detail Barang</h1>
      <p>
        <strong>Stack:</strong> {detailData.stack}
      </p>
      <p>
        <strong>Kode:</strong> {detailData.code}
      </p>
      <p>
        <strong>Nama:</strong> {detailData.name}
      </p>
      <p>
        <strong>Jumlah:</strong> {detailData.quantity}
      </p>
      <p>
        <strong>Kategori:</strong> {detailData.category}
      </p>
    </div>
  );
}

export default DetailPage;
