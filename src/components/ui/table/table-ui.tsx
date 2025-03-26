import React from "react";

export type Item = {
  _id: string;
  stack: string;
  code: string;
  name: string;
  quantity: number;
  category: string;
  in: string;
  out: string;
  [key: string]: string | number;
};

type TableProps = {
  headers: string[];
  tableData: string[];
  filteredData: Item[];
  renderAction?: (data: Item) => React.ReactNode;
};

export const TableHeader: React.FC<{ headers: string[] }> = ({ headers }) => (
  <thead className="sticky top-0 bg-primary">
    <tr>
      {headers.map((head, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
        >
          {head}
        </th>
      ))}
    </tr>
  </thead>
);

export const TableRow: React.FC<{
  data: Item;
  tableData: string[];
  renderAction?: (data: Item) => React.ReactNode;
}> = ({ data, tableData, renderAction }) => {
  const formatDate = (value: string | number) => {
    if (typeof value === "string" && value.includes("T")) {
      return value.split("T")[0];
    }
    return value;
  };

  return (
    <tr className="hover:bg-gray-50">
      {tableData.map((key, idx) => (
        <td key={idx} className="p-6 whitespace-nowrap text-md text-fontMedium">
          {formatDate(data[key])}
        </td>
      ))}
      {renderAction && <td className="space-x-8">{renderAction(data)}</td>}
    </tr>
  );
};

export const Table: React.FC<TableProps> = ({
  headers,
  tableData,
  filteredData,
  renderAction,
}) => (
  <div className="overflow-y-auto max-h-80 rounded-xl">
    <table className="border border-foreBackground min-w-full divide-y divide-foreBackground shadow-lg rounded-2xl">
      <TableHeader headers={headers} />
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredData.map((data, index) => (
          <TableRow
            key={index}
            data={data}
            tableData={tableData}
            renderAction={renderAction}
          />
        ))}
        {filteredData.length === 0 && (
          <tr>
            <td
              colSpan={headers.length}
              className="px-6 py-4 text-center text-sm text-fontMedium"
            >
              Data tidak ditemukan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
