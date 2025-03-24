import { useEffect, useState } from "react";
import { Button } from "./button";
import { FormInput } from "./input";
import { Item, Table } from "./table/table-ui";
import ViewModal from "./detail";
import axios from "axios";

const TableData: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = ["Stack", "Code", "Name", "Quantity", "Category", "Action"];
  const tableData = ["stack", "code", "name", "quantity", "category"];
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/items`);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  const filteredData: Item[] = items.filter(
    (item: Item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.code.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderAction = (data: Item) => (
    <div className="flex space-x-8">
      <Button
        variant="submit"
        text={"View"}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <ViewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Detail Item"
        >
          <div>
            <p>
              <strong>Kode Barang:</strong> {data.code}
            </p>
            <p>
              <strong>Nama:</strong> {data.name}
            </p>
            <p>
              <strong>Kuantitas:</strong> {data.quantity}
            </p>
          </div>
          <div>
            <p>
              <strong>Barang Masuk:</strong> {data.in}
            </p>
            <p>
              <strong>Barang Keluar:</strong> {data.out}
            </p>
          </div>
        </ViewModal>
      )}
      <Button text={"Delete"} variant="delete" />
    </div>
  );

  return (
    <div className="container mx-auto space-y-4 p-4">
      <FormInput
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder={"Cari Barang"}
        type={"text"}
        name={""}
      />
      <Table
        headers={headers}
        tableData={tableData}
        filteredData={filteredData}
        renderAction={renderAction}
      />
    </div>
  );
};

export default TableData;
