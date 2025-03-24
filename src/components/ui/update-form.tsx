import React, { useState } from "react";
import { Button } from "./button";
import { FormInput } from "./input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    category: "",
    in: "",
    out: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Tambah Barang Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kode Barang
              </label>
              <FormInput
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Barang
              </label>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="Elektronik">Elektronik</option>
                <option value="Peralatan Rumah Tangga">
                  Peralatan Rumah Tangga
                </option>
                <option value="Alat Tulis">Alat Tulis</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Masuk
              </label>
              <FormInput
                type="date"
                name="in"
                value={formData.in}
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Keluar
              </label>
              <FormInput
                type="date"
                name="out"
                value={formData.out}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button text={"Save"} variant="submit" />
            <Button text={"Cancel"} variant="delete" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
