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
      <main className="bg-[url('/assets/background3.jpg')] bg-cover bg-center">
        <section className="flex justify-center items-center">
          <div className="bg-gradient-to-r from-secondary to-primary flex flex-col w-3/4 py-10 px-6 rounded-3xl shadow-xl ml-4">
            <h1 className="font-extrabold text-white text-4xl mb-6 tracking-wide">
              Welcome to Dashboard
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center p-6 h-32 rounded-2xl bg-white shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <h1 className="text-5xl font-extrabold text-fontBold">
                + New Item
              </h1>
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
