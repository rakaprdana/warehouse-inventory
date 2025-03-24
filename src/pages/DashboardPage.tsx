import { Navbar } from "../components/ui/navbar";
import { TableDataInOut } from "../components/ui/table-in-out";
import TableData from "../components/ui/table-data";
import { useState } from "react";
import { NewForm } from "../components/ui/new-form";

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar />
      <main>
        <section className="flex justify-center items-center">
          <div className="bg-[#992626] flex flex-col w-3/4 py-8 px-4 rounded-2xl ml-4">
            <h1 className="font-bold text-white text-3xl mb-3">Hello, User</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-background flex items-center p-4 h-28 rounded-xl hover:bg-gray-100 transition duration-200 hover:cursor-pointer"
            >
              <h1 className="text-4xl font-extrabold">New Item</h1>
            </button>
            <NewForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
          <TableDataInOut />
        </section>
        <TableData />
      </main>
    </>
  );
};
