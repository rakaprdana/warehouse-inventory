import { useEffect, useState } from "react";
import { FormInput } from "./input";
import { Item, Table } from "./table/table-ui";
import { getAllItems } from "../../axios/api";

export const TableDataInOut: React.FC = () => {
  const [filterText, setFilterText] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const headers = ["Code", "Name", "In", "Out"];
  const tableData = ["code", "name", "in", "out"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItems(await getAllItems());
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

  return (
    <div className="container mx-auto p-4 space-y-4">
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
      />
    </div>
  );
};
