import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { FormInput } from "./input";
import { Item, Table } from "./table/table-ui";
import ViewModal from "./detail";
import { deleteItem, getAllItems } from "../../axios/api";

const TableData: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterText, setFilterText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItems(await getAllItems());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

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
    setSearchParams({});
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;

    try {
      await deleteItem(id || "", token || "");
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
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
  const formatDate = (value?: string) => {
    if (value && value.includes("T")) {
      return value.split("T")[0];
    }
    return value || "-";
  };
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
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full max-w-md">
            <h2 className="text-maroon-700 text-xl font-bold border-b pb-2 mb-4">
              Detail Barang
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">
                  Kode Barang:
                </span>{" "}
                {selectedItem.code}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">Nama:</span>{" "}
                {selectedItem.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">
                  Kuantitas:
                </span>{" "}
                {selectedItem.quantity}
              </p>
            </div>
            <h2 className="text-maroon-700 text-xl font-bold border-b pb-2 mt-6 mb-4">
              Pergerakan Barang
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">
                  Barang Masuk:
                </span>{" "}
                {formatDate(selectedItem.in)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">
                  Barang Keluar:
                </span>{" "}
                {formatDate(selectedItem.out)}
              </p>
            </div>
          </div>
        </ViewModal>
      )}
    </div>
  );
};

export default TableData;
