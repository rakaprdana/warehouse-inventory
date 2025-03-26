import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { FormInput } from "./input";
import { Item, Table } from "./table/table-ui";
import ViewModal from "./detail";
import { deleteItem, getAllItems } from "../../axios/api";
import ConfirmModal from "./confirm-modal";

const TableData: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
  const selectedItem = items.find(
    (item) => item._id === searchParams.get("id")
  );

  const openModal = (id: string) => {
    setSearchParams({ id });
  };

  const closeModal = () => {
    setSearchParams({});
  };

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteItem(selectedId, token || "");
      setItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsModalOpen(false);
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
        onClick={() => confirmDelete(data._id)}
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
        placeholder="Search Item"
        type="text"
        name=""
      />
      <Table
        headers={["Stack", "Code", "Name", "Quantity", "Category", "Action"]}
        tableData={["stack", "code", "name", "quantity", "category"]}
        filteredData={filteredData}
        renderAction={renderAction}
      />
      {selectedItem && (
        <ViewModal isOpen={true} onClose={closeModal} title="Detail Item">
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full max-w-md">
            <h2 className="text-maroon-700 text-xl font-bold border-b pb-2 mb-4">
              Item Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">
                  Item Code:
                </span>{" "}
                {selectedItem.code}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">Name:</span>{" "}
                {selectedItem.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">Quantity:</span>{" "}
                {selectedItem.quantity}
              </p>
            </div>
            <h2 className="text-maroon-700 text-xl font-bold border-b pb-2 mt-6 mb-4">
              Item Movements
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">Incoming:</span>{" "}
                {formatDate(selectedItem.in)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-maroon-800">Outgoing:</span>{" "}
                {formatDate(selectedItem.out)}
              </p>
            </div>
          </div>
        </ViewModal>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TableData;
