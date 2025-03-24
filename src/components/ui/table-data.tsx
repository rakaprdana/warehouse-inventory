import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { FormInput } from "./input";
import { Item, Table } from "./table/table-ui";
import ViewModal from "./detail";
import axios from "axios";

const TableData: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterText, setFilterText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API]); // Fetch data hanya sekali

  const filteredData: Item[] = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.code.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
  );

  // Ambil _id dari URL
  const selectedId = searchParams.get("id");
  const selectedItem = items.find((item) => item._id === selectedId);

  const openModal = (id: string) => {
    setSearchParams({ id }); // Tambahkan _id ke URL
  };

  const closeModal = () => {
    setSearchParams({}); // Hapus _id dari URL
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Hapus dari state
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Gagal menghapus data.");
    }
  };

  const renderAction = (data: Item) => (
    <div className="flex space-x-8">
      <Button
        variant="submit"
        text="View"
        onClick={() => openModal(data._id)}
      />
      <Button
        variant="delete"
        text="Delete"
        onClick={() => handleDelete(data._id)}
      />
    </div>
  );

  return (
    <div className="container mx-auto space-y-4 p-4">
      <FormInput
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Cari Barang"
        type="text"
        name=""
      />
      <Table
        headers={["Stack", "Code", "Name", "Quantity", "Category", "Action"]}
        tableData={["stack", "code", "name", "quantity", "category"]}
        filteredData={filteredData}
        renderAction={renderAction}
      />

      {/* Modal akan muncul jika ada selectedId */}
      {selectedItem && (
        <ViewModal isOpen={true} onClose={closeModal} title="Detail Item">
          <div>
            <p>
              <strong>Kode Barang:</strong> {selectedItem.code}
            </p>
            <p>
              <strong>Nama:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Kuantitas:</strong> {selectedItem.quantity}
            </p>
          </div>
          <div>
            <p>
              <strong>Barang Masuk:</strong> {selectedItem.in}
            </p>
            <p>
              <strong>Barang Keluar:</strong> {selectedItem.out}
            </p>
          </div>
        </ViewModal>
      )}
    </div>
  );
};

export default TableData;
